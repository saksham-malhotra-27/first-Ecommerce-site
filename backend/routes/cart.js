import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';
import { addtocart, deleteProductFromCart, showcart } from '../controllers/cartSystem.js';

const router = express.Router()

router.get('/show', requireSignIn, showcart)

router.put('/addtocart', requireSignIn, addtocart)

router.delete('/deleteProductFromCart', requireSignIn, deleteProductFromCart)
export default router