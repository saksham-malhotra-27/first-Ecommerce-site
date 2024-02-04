import express from "express"
import { createProductController, deleteProductController,  updateProductController, singleProductController, productController , productControllerWithoutImage, productControllerForGivenCategory} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();
// singleProductController,  productController
//avatar is the form-field of image 

router.post('/create-product', requireSignIn, upload.single('avatar'), createProductController);

router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController);

router.put('/update-product/:id', requireSignIn, isAdmin, upload.none(), updateProductController );

router.get(`/products/woimage`, productControllerWithoutImage);
router.get(`/:slug`, singleProductController);



router.get('/', productController);

router.get('/products/:catId', productControllerForGivenCategory);

export default router;