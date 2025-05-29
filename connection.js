import mongoose from 'mongoose'

const url='mongodb://127.0.0.1:27017/hoteldb'
mongoose.connect(url)

console.log("mongodb database connected successfully");