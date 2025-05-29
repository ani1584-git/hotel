import express from 'express'
import './connection.js'
import mongoose from 'mongoose'



const app=express()

import personRoutes from './routes/personRoutes.js'
import  menuitemRoutes from './routes/menuitemRoutes.js'

app.use(express.json());


app.use('/person',personRoutes)
app.use('/menuitem',menuitemRoutes)

app.listen(3001,()=>{
    console.log("server invoked at http://localhost:3001")
})
//hii