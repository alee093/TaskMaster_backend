import dotenv from 'dotenv'

dotenv.config()

const ENVIRONMENT = {
    MONGO_URL: process.env.MONGO_URL,
    DATABASE_NAME: process.env.DATABASE_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    URL_FRONTEND: process.env.URL_FRONTEND || 'http://localhost:3000' 
}

export default ENVIRONMENT