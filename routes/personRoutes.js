import express from 'express'
import Person from '../models/person.js'

const router=express.Router();

router.get("/",async (req,res)=>{
    try{
        const data=await Person.find()
        console.log("data fetched")
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get("/:workType",async (req,res)=>{
    try{
        const workType=req.params.workType
        if(workType=='chef'||workType=='waiter'||workType=='manager'){
        const data=await Person.find({work:workType})
        console.log("data fetched")
        res.status(200).json(data)
        }
        else{
            res.status(404).json({error:'invalid worktype'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.post("/",async (req,res)=>{
    try{
       const data=req.body
       const newPerson=new Person(data)
       const response=await newPerson.save()
       console.log("data has been saved to database");
       res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
    
})

router.put("/:id",async (req,res)=>{
    try{
        const personId=req.params.id
        const updatedPersonData=req.body

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        })
        if(!response){
            res.status(404).json({error:'person not found'})
        }

        console.log("data updated")
        res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const personId=req.params.id

        const response=await Person.findByIdAndRemove(personId)
        if(!response){
            res.status(404).json({error:'person not found'})
        }

        console.log("data deleted")
        res.status(200).json({message:'data deleted successfully'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})
export default router;