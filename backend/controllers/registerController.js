import userm from '../models/userm.js'
import { hashpass } from '../utils/authHelper.js';
import jwt from "jsonwebtoken";


const registerController = async function(req, res) {
    try{
        const {name , email , password , phone , address} = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is Required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Email is Required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is Required' });
        }
        if (!phone) {
            return res.status(400).json({ message: 'Phone is Required' });
        }
        if (!address) {
            return res.status(400).json({ message: 'Address is Required' });
        }
        

        const xuser = await userm.findOne({email});
        if(xuser){
            return res.status(200).send({
                success:false, 
                message: 'Already registered please login'
            })
        }
        const hashedpassword = await hashpass(password);
        const user = await new userm({name,email,password:hashedpassword, phone,address, cart:[]}).save();
        res.status(201).send({
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
                cart:user.cart,
            },
            success:true,
            message:'user registered successfully'
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
};



export default registerController;