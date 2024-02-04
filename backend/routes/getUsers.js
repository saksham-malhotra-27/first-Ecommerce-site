import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';
import { getUsersController } from '../controllers/getUsersController.js';

const router = express.Router()

router.get('/', requireSignIn, isAdmin, getUsersController);

export default router;