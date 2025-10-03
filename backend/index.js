import 'dotenv/config'; 
import connectToMongoDB from "./src/config/configMongoDB.config.js"
import express from "express"
import router from "./src/routes/Note.routes.js"
import cors from "cors"
import authRouter from "./src/routes/Auth.routes.js"

const app = express()

// 1. Tomar la variable de entorno y convertirla en un array de strings.
const productionOrigins = (process.env.FRONTEND_URL || '') // Usa string vacío si no existe
    .split(',') // Divide por coma (por si hay más de una URL)
    .map(url => url.trim()) // Elimina espacios en blanco alrededor
    .filter(url => url); // Elimina entradas vacías

const allowedOrigins = [
    ...productionOrigins, // Incluye el o los dominios de Vercel
    'http://localhost:5173', 
    'http://localhost:3000' 
];

// 2. Aplicar el middleware CORS simplificado (que ya hicimos)
app.use(cors({
    origin: allowedOrigins, 
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