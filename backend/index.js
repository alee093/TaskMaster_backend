import 'dotenv/config'; // <-- AÑADIR ESTO: Asegura que process.env esté disponible
import connectToMongoDB from "./src/config/configMongoDB.config.js"
import express from "express"
import router from "./src/routes/Note.routes.js"
import cors from "cors"
import authRouter from "./src/routes/Auth.routes.js"

const app = express()

// Ahora solo definimos los orígenes. 
// La librería 'cors' se encargará de toda la lógica.
const allowedOrigins = [
    process.env.FRONTEND_URL, 
    'http://localhost:5173', 
    'http://localhost:3000' 
];

// SIMPLIFICACIÓN: Usar el array directamente.
app.use(cors({
    origin: allowedOrigins, // <--- ESTO ES MÁS ROBUSTO
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