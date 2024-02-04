import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true, 
    },
    slug:{
        type:String, 
        required: true, 
    },
    description:{
        type: String ,
        required : true , 
    }
    , price:{
        type: Number,
        required  : true, 
    },
    category:{
        type: mongoose.ObjectId, 
        ref: 'category',
        required: true,
    },
    quantity:{
        type: Number,
        required : true, 
    },
    photo:{
        filename: String,
    },
    shipping :{
        type: Boolean, 
    }

},{
    timestamps: true
})

const productm = mongoose.model('product', productSchema);

export default productm;