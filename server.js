console.log("🚀 Server is starting...");

import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import './connection.js'
import passport from './auth.js'

dotenv.config();

const app=express()

const PORT=process.env.PORT||3001

const logRequest=(req,res,next)=>{
   console.log(`[${new Date().toLocaleString()}] request made to : ${req.originalUrl}`)
   next()
}

app.use(logRequest)
app.use(express.json())
app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/',function(req,res){
  res.send('Welcome to hotel')
})

app.use(express.json());

import personRoutes from './routes/personRoutes.js'
import  menuitemRoutes from './routes/menuitemRoutes.js'


app.use('/person', personRoutes)
app.use('/menuitem', menuitemRoutes)


app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

//hii