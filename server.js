console.log("🚀 Server is starting...");


import dotenv from 'dotenv'
import express from 'express'
import './connection.js'
import mongoose from 'mongoose'

dotenv.config();

const app=express()

import personRoutes from './routes/personRoutes.js'
import  menuitemRoutes from './routes/menuitemRoutes.js'

app.use(express.json());

const PORT=process.env.PORT||3001

app.use('/person',personRoutes)
app.use('/menuitem',menuitemRoutes)



app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

//hii