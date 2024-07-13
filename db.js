import mongoose from 'mongoose'
//define mongodb connection  url
import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
})

const MONGODB_URL= process.env.Mongo_URL
//setup mongodb connection

mongoose.connect(MONGODB_URL)
const db= mongoose.connection;

db.on('connected', ()=>{
    console.log('connected to MongoDb')
})
db.on('error', ()=>{
    console.log('Error in connection')
})
db.on('disconnected', ()=>{
    console.log('disonnected to MongoDb')
})

export default db