import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

async function connectToMongoDB (){
    try{
        const DB_NAME = process.env.DATABASE_NAME
        const connection_string = process.env.MONGO_URL + DB_NAME
        await mongoose.connect(connection_string)
        console.log("Conexion con DB exitosa!")
    }
    catch(error){
        console.log('[SERVER ERROR]: Fallo en la conexion',  error)
    }
}

export default connectToMongoDB