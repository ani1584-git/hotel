import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

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
     }
});

personSchema.plugin(uniqueValidator);

const Person=mongoose.model('person',personSchema);
export default Person;