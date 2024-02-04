import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true, 
        unique: true, 
    },
    slug:{
        type: String ,
        lowercase : true, 
    }
})

const categorym =  mongoose.model('category', categorySchema)
export default categorym;