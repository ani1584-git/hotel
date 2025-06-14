import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config();

const mongoURL=process.env.MONGODB_URL_LOCAL
//const mongoURL=process.env.MONGODB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));