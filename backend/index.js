import connectToMongoDB from "./src/config/configMongoDB.config.js"
import express from "express"
import router from "./src/routes/Note.routes.js"
import cors from "cors"
import authRouter from "./src/routes/Auth.routes.js"

const app = express()
const allowedOrigins = [
    // El dominio de tu frontend en Vercel (lo obtendrás al desplegarlo)
    process.env.FRONTEND_URL, 
    // Para pruebas locales, si lo necesitas
    'http://localhost:5173', 
    'http://localhost:3000' 
];

// 2. Configura el middleware de CORS para que use esa lista
app.use(cors({
    origin: (origin, callback) => {
    // Si el origen de la petición está en la lista O si no hay origen (peticiones del mismo servidor/postman)
    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
    },
  credentials: true // Importante si manejas cookies o sesiones
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectToMongoDB()

app.use("/api/notes", router)
app.use("/api/auth", authRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) 