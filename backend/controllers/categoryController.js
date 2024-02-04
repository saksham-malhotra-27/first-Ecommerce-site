import slugify from "slugify"
import categorym from "../models/categorym.js"
export const createCategoryController = async (req, res) =>{
    try{
        const {name} = req.body 
        if(!name){
            return res.status(401).send({
                message:" name is required "
            })

        }
        const lown = name.toLowerCase();
        const existingCategory = await categorym.findOne({name:lown})
        if(existingCategory){
            return res.status(201).send({
                success:false,
                message: 'Category Already Existed'
            })
        }
        const category = await new categorym({ name: name.toLowerCase(), slug: slugify(name) }).save();
        res.status(201).send({
            success:true,
            message:"Category created",
            category
        })
    }
    catch(error){
        console.log(error);
        res.status(500). send({
            success:false, 
            error,
            message: 'error in category'
        })
    }
}

export const updateCategoryController = async(req, res) => {
try{
     const {name} = req.body;
     const {id} = req.params 

     if(!name){
        return res.status(401).send({
            message:"Enter full credentials"
        })

     }
     if(!id){
        return res.status(401).send({
            message:"Enter full credentials"
        })
     }

     const cat = await categorym.findByIdAndUpdate(
        id
     ,
     {
        name: name.toLowerCase(), slug: slugify(name)
    }, 
    {new : true}
     )

     if(!cat){
        return res.status(401).send({
            success:false,
            message: 'Category is not Existing, Create the Category first'
        })
     }
     return res.status(200).send({
        success: true, 
        message: 'Category is updated ',
        cat
     })
     

} 

catch(error){
   console.log(error);
   res.status(500).send({
    success:false,
    error,
    message:"Error while updating category",
   })
}
}

export const categoryController = async(req, res) => {
try{
    const categories = await categorym.find({});
    res.status(200).send({
        success:true,
        message:"All Categories",
        categories,
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

export const singleCategoryController = async(req,res) =>{
    try{
         const cat = await categorym.findOne({
            slug : req.params.slug
         })
         res.status(200).send({
            success:true,
            message:"Get single category",
            cat
         });

    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"This category isn't here",
            error
        })
    }
}

export const deleteCategoryController = async(req,res) =>{
    try{
        const {id} = req.params 
        const deletedCategory = await categorym.findByIdAndDelete(id)
        if (!deletedCategory) {
            return res.status(404).send({
              success: false,
              message: 'Category not found or already deleted',
            });
          }
        res.status(200).send({
            success:true,
            message: 'Category deleted'
        })
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"This category isn't here",
            error
        })
    }
}