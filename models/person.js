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

personSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

// Create Person model
const Person = mongoose.model('Person', personSchema);
export default Person;