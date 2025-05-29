import express from 'express'
import menuitem from '../models/menuitem.js'

const router=express.Router();

router.post("/",async (req,res)=>{
    try{
       const data=req.body
       const newMenu=new menuitem(data)
       const response=await newMenu.save()
       console.log("data has been saved to database");
       res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }   
})

router.get("/",async (req,res)=>{
    try{
        const data=await menuitem.find()
        console.log("data fetched")
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

export default router;