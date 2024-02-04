import jwt from "jsonwebtoken";
import userm from "../models/userm.js"
export const requireSignIn = async function(req,res,next){
    try{
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode;
        const usr = await userm.findById(req.user._id)
        req.role = usr.role; 
        next();
    }
    catch(error){
        console.log(error);
    }
}

//admin access 

export const isAdmin = async function (req,res,next){
    try{
        const user = await userm.findById(req.user._id)
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:'Unauthorized Access'
            })
        }
        else{
            next()
        }
    }
    catch(error){
   console.log(error)
   res.status(401)
    }
}