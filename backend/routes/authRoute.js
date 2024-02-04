import express from 'express';
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

/*
router.get('/login', ()=>{console.log("hi")})
//for test : 
router.get('/test', requireSignIn,isAdmin, ()=>{ console.log("done")});
*/

//protected route
router.get('/user-auth', requireSignIn, (req,res)=>{ 
    if(req.user){
        res.status(200).send({ ok:true , role: req.role})
    }
     else{
        res.status(401).send({ok:false})
     }
});

router.get('/admin-auth', requireSignIn, isAdmin , (req,res)=>{
    if(req.user){
        res.status(200).send({ 
            ok:true ,
            role:req.user.role})
    }
     else{
        res.status(401).send({ok:false})
     }
})

export default router;