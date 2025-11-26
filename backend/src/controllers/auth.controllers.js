import UserRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateVerificationToken } from "../utils/token.utils.js";
import { sendVerificationEmail } from "../services/email.service.js";
import ENVIRONMENT from "../config/environment.config.js";

const JWT_SECRET = ENVIRONMENT.JWT_SECRET;
export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const newUser = await UserRepository.createUser(
      username,
      email,
      hashedPassword,
      verificationToken
    );

    await sendVerificationEmail(newUser.email, verificationToken, newUser.username);

    res.status(201).json({
      message: "User registered successfully. Please log in.",
      user: newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.is_verified) {
      return res.status(401).json({ message: "User is not verified" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        is_verified: user.is_verified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const verifyEmailController = async (req, res) => {
    const { token } = req.query; // El token viene como query parameter: /api/auth/verify-email?token=...

    if (!token) {
        return res.status(400).json({ message: "Verification token is missing." });
    }

    try {
        const user = await UserRepository.findByToken(token);

        if (!user) {
            return res.status(404).json({ message: "Invalid or expired verification link." });
        }

        if (user.is_verified) {
            // Ya verificado, redirigir a login o a una página de éxito.
            return res.status(200).json({ message: "Email already verified." });
        }

        // Marcar al usuario como verificado y limpiar el token.
        await UserRepository.verifyUser(user._id);

        // Puedes redirigir al usuario al frontend después de la verificación.
        // Por ejemplo: res.redirect(`${ENVIRONMENT.URL_FRONTEND}/login?verified=true`)
        return res.status(200).json({ message: "Email verified successfully! You can now log in." });
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ message: "Server error during email verification." });
    }
};