import express from 'express'
import dotenv from 'dotenv'
import { registerController, loginController, verifyEmailController } from '../controllers/auth.controllers.js'
dotenv.config()

const authRoutes = express.Router()


authRoutes.post('/register', registerController)
authRoutes.post('/login', loginController)
authRoutes.get('/verify-email', verifyEmailController)

export default authRoutes