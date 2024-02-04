
import userm from "../models/userm.js";
import { comparePassword } from "../utils/authHelper.js";
import jwt from "jsonwebtoken";

const loginController = async function (req,res){
    try{
    const {email, password} = req.body;
    //validation
    if(!email || !password){
        return res.send({ success:false, message:'email or password is wrong'});
    }

    const user = await userm.findOne({email});
    if(user){
        const match = await comparePassword(password , user.password );
        if(!match){
            return res.status(401).send({
                success:false, message:"Invalid Password"
            })
        }
        const token = await jwt.sign({
            _id:user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        } 
        )

        res.status(200).send({
            user:{
                _id:user.id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
                cart:user.cart,
            },
            token,
            success:true,
            message:'login successfull'
        })
    }
    else{
        res.status(401).send({
                success:false,
                message:"Email is not registered"
        });
    }
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        });  
    }
    
}

export default loginController;