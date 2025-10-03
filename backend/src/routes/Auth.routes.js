import express from 'express'
import dotenv from 'dotenv'
import { registerController, loginController } from '../controllers/auth.controllers.js'
dotenv.config()

const authRoutes = express.Router()


authRoutes.post('/register', registerController)
authRoutes.post('/login', loginController)

export default authRoutes