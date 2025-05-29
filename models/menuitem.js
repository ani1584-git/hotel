import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const menuSchema=new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     price:{
         type:Number,
         default:0
     },
     num_sales:{
        type:Number,
        default:0
     }
});

menuSchema.plugin(uniqueValidator);

const menuitem=mongoose.model('menuitem',menuSchema);
export default menuitem;