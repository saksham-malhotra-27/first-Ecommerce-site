import slugify from "slugify"
import userm from "../models/userm.js"
import productm from "../models/productm.js";
import mongoose from "mongoose";
export const showcart = async (req, res) => {
    if (req.user) {
      try {
        const fetchingCart  = await userm.findById(req.user._id).select('cart');
        return res.json({ fetchingCart, message: "User information logged successfully",success:true});
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", success:false });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" , success:false});
    }
  };


  export const addtocart = async (req, res) => {
    if (req.user ) {
      try {
        console.log(req.user);
        const { name, quantity } = req.body;
  
        console.log('Attempting to find product with name:', name);
        if (!name || !quantity) {
          return res.status(400).json({ message: "Name and quantity are required", success: false });
        }
  
        const user = await userm.findOne({_id:req.user._id});
        console.log(user)
        if (!user) {
          return res.status(404).json({ message: "User not found", success: false });
        }
        const existingCartItem = user.cart.find(item => item.product_name === name);
        
        if (existingCartItem) {
          const updatedUser = await userm.findOneAndUpdate(
            { _id: user._id, "cart.product_name": name },
            { $inc: { "cart.$.quantity": parseInt(quantity) } },
            { new: true }
          ).select('cart');
  
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
          }
  
          return res.json({ updatedUser, message: "Quantity increased in cart successfully", success: true });
        } else {
          const product = await productm.findOne({ name: name });
  
          if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
          }
  
          const updatedUser = await userm.findByIdAndUpdate(
            req.user._id,
            { $push: { "cart": { product_id: product._id, quantity: parseInt(quantity), product_name: product.name } } },
            { new: true }
          ).select('cart');
  
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
          }
  
          return res.json({ updatedUser, message: "Product added to cart successfully", success: true });
        }
  
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  };
  
  
  export const deleteProductFromCart = async (req, res) => {
    if (req.user && req.user._id) {
      try {
        console.log(req.user);
        const { name, quantity } = req.body;
  
        console.log('Attempting to find product with name:', name);
        if (!name || !quantity) {
          return res.status(400).json({ message: "Name and quantity are required", success: false });
        }
  
        const user = await userm.findOne({_id:req.user._id});
         console.log(user)
        if (!user) {
          return res.status(404).json({ message: "User not found", success: false });
        }
  
        const existingCartItem = user.cart.find(item => item.product_name === name);
  
        if (!existingCartItem) {
          return res.status(404).json({ message: "Product not found in the user's cart", success: false });
        }
  
        let updatedUser;
  
        if (existingCartItem.quantity <= parseInt(quantity)) {
          updatedUser = await userm.findByIdAndUpdate(
            req.user._id,
            {
              $pull: {
                cart: {
                  product_name: name
                }
              }
            },
            { new: true }
          ).select('cart');
        } else {
          updatedUser = await userm.findOneAndUpdate(
            { _id: req.user._id, "cart.product_name": name },
            {
              $inc: {
                "cart.$.quantity": -Math.min(parseInt(quantity), existingCartItem.quantity)
              }
            },
            { new: true }
          ).select('cart');
        }
  
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found", success: false });
        }
  
        return res.json({ updatedUser, message: "Product removed or quantity decreased in cart successfully", success: true });
  
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
  };
  