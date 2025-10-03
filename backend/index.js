import connectToMongoDB from "./src/config/configMongoDB.config.js"
import express from "express"
import router from "./src/routes/Note.routes.js"
import cors from "cors"
import authRouter from "./src/routes/Auth.routes.js"

const app = express()
const allowedOrigins = [
    // La variable de entorno de Render
    process.env.FRONTEND_URL, 
    // Para pruebas locales
    'http://localhost:5173', 
    'http://localhost:3000' 
];

// SIMPLIFICACIÓN: Usar el array directamente en el objeto de configuración.
app.use(cors({
    origin: allowedOrigins, // <--- CAMBIO CRUCIAL AQUÍ
    credentials: true
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