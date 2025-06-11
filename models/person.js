import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const personSchema=new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     age:{
         type:Number
     },
     work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
     },
     mobile:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     address:{
        type:String,
     },
     salary:{
        type:Number,
        required:true
     },
     username:{
           type:String,
           required:true
     },
     password:{
           type:String,
           required:true
     }
     
});

personSchema.plugin(uniqueValidator);

personSchema.pre('save',async function(next){
   if(!person.isModified('password')) return next()

   try{
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(person.password,salt)
      }
   catch(err){
        return next(err)
   }
})

personSchema.methods.comparePassword=async function(candidatePassword){
   try{
      const isMatch=await bcrypt.compare(candidatePassword,this.password)
      return isMatch
   }
   catch(err){
      throw err
   }
}


const Person=mongoose.model('person',personSchema);
export default Person;