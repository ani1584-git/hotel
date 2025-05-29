import mongoose from 'mongoose'
import dotenv from 'dotenv'

//const mongoURL=process.env.MONGODB_URL_LOCAL
const mongoURL=process.env.MONGODB_URL;
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

console.log("mongodb database connected successfully");