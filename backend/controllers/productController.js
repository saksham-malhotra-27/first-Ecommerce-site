import fs from 'fs';
import { promisify } from 'util';
import multer from 'multer';
import slugify from 'slugify';
import productm from '../models/productm.js';
import { uploadCloudinary } from '../utils/cloudinary.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'

export const createProductController =  async (req, res) => {
    try {
        console.log(req)
        if(!req.file) {
          return res.status(400).send({
            message:"no file attached",
            success:false
          })
        }
        const { name, description, price, category, quantity, shipping } = req.body;
        const { path: imagePath, filename } = req.file;
        
        
        const newProduct = new productm({
          name,
          slug: slugify(name, { lower: true }),
          description,
          price,
          category,
          quantity,
          shipping,
          photo: {
            filename: filename,
          }
        });
    
        await newProduct.save();
    
        res.status(200).send({ success:true , message: 'Product created successfully', product: newProduct });
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send({ 
          message: 'Internal Server Error', success:false });
      } 
};

export const deleteProductController= async(req, res) => {
         try{
          const id = req.params.id;
            console.log(id)
            
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const destinationPath = path.join(__dirname, '../../frontend/public');
            
            const product = await productm.findById(id);
            if (!product) {
              return res.status(400).json({ message: 'Product not found', success: false });
            }
             const imagePath = `${destinationPath}/${product.photo.filename}`
             fs.unlinkSync(imagePath);        
             await product.deleteOne();
             res.status(200).json({ message: 'Product deleted successfully', success: true });
         }
         catch(error){
          console.error('Error creating product:', error);
          res.status(500).json({ message: 'Internal Server Error', success:false });
         }
};
 
export const updateProductController = async (req, res) => {
  try {
    
    const id = req.params.id;
    const { name, description, price, category, quantity, shipping } = req.body;
    console.log(typeof name)
    const product = await productm.findById(id);
    if (!product) {
      return res.status(400).send({ message: 'Product not found', success: false });
    }
    
    
    product.name = name ? name:product.name ;
    console.log(typeof name)
    product.slug = name? slugify(name, { lower: true }): product.slug;
    product.description = description?  description: product.description;
    product.price =price? price:product.price;
    product.category = category? category:product.category;
    product.quantity = quantity? quantity: product.quantity;
    product.shipping = shipping? shipping: product.shipping;

    await product.save();

    res.status(200).send({success:'true', message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send({ message: 'Internal Server Error' , success:false});
  }
};   

export const singleProductController = async (req, res) => {
try{ 
    const slug = req.params.slug;
    console.log(slug) 
    const product = await productm.findOne({ slug: slug });
    console.log("PRODUCT IS : ",product);
    if (!product) {
      return res.status(400).send({ message: 'Product not found', success: false });
    }
    return res.status(200).send({product, message:"The product is here", success:true});

}
catch(error){
  res.status(500).send({ message: 'Internal Server Error', success:false });
}
}

export const productController = async (req, res) => {
  try{
    const products = await productm.find({});
    res.status(200).send({
        success:true,
        message:"All Categories",
        products,
    })
}
catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"server error while gettign all ",
        error,
    })
}
}

export const productControllerWithoutImage = async (req,res) => {
  try{
    const products = await productm.find({}).select('name _id');
    res.status(200).send({
        success:true,
        message:"All Categories",
        products,
    })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"server error while gettign all ",
        error,
    })
  }
}

export const productControllerForGivenCategory = async (req,res) => {
  try{
    const catId = req.params.catId;
    console.log(catId)
    const products = await productm.find({category: catId});
    res.status(200).send({
        success:true,
        message:"All Categories",
        products,
    })
  }
  catch(err){
    console.log(err);
    res.status(500).send({
        success:false,
        message:"server error while gettign all ",
        err,
    })
  }
}