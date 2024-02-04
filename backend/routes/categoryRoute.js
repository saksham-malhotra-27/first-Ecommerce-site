import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';
import { createCategoryController, updateCategoryController , categoryController, singleCategoryController, deleteCategoryController } from '../controllers/categoryController.js';

const router = express.Router()

router.post('/create-category', requireSignIn, isAdmin, createCategoryController)


router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController )
//can do it like only '/' in the below one 
router.get('/categories', categoryController);

router.get(`/:slug`, singleCategoryController);

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;