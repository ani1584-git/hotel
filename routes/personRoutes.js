import express from 'express'
import Person from '../models/person.js'
import { jwtAuthMiddleware, generateToken } from './../jwt.js';

const router=express.Router();

router.post("/signup",async (req,res)=>{
    try{
       const data=req.body
       const newPerson=new Person(data)
       const response=await newPerson.save()
       console.log("data has been saved to database");

       const payload={
        id:response.id,
        username:response.username
       }
       console.log(JSON.stringify(payload))
       const token=generateToken(payload)
       console.log("Token is : ",token)
       res.status(200).json({response:response,token:token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
    
})


router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.get("/",jwtAuthMiddleware,async (req,res)=>{
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