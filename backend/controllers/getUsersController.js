import userm from "../models/userm.js"


export const getUsersController = async (req,res) => {
    try{
        const Users = await userm.find({role:0}).select('-password');
        if(!Users){
           return  res.status(401).send({
            message:"No users found",
            Success:true
           })
        }
        return  res.status(200).send({
            message:"Users",
            Success:true,
            Users
           })
    }
    catch(error){
        return res.status(500).send({
            message:"Internal Server Error",
            Success:false,
        })
    }
}