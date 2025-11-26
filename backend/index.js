import 'dotenv/config'; 
import connectToMongoDB from "./src/config/configMongoDB.config.js"
import express from "express"
import router from "./src/routes/Note.routes.js"
import cors from "cors"
import authRouter from "./src/routes/Auth.routes.js"

const app = express()
const productionOrigins = (process.env.URL_FRONTEND || '')
    .split(',') 
    .map(url => url.trim())
    .filter(url => url); 

const allowedOrigins = [
    ...productionOrigins, 
    'http://localhost:5173', 
    'http://localhost:3000' 
];

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