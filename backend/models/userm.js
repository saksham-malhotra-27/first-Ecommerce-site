import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }, 
    role:{
        type:Number,
        default:0,
    },
    cart: [
        {
          product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product', // Reference to the Product model
          },
          quantity: {
            type: Number,
            default: 1,
          },
          product_name:{
            type: String,
            required: true,
          }
        },
      ],
}
    ,{
      timestamps:true
    }
)

const userm = mongoose.model("users", userSchema);

export default userm;

