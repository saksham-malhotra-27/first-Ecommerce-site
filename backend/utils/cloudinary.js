import {v2 as cloudinary } from "cloudinary"

import fs from "fs"

/*
cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });
          
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dxptcdxtr', 
  api_key: '783749438291583', 
  api_secret: 'r1zLyeAhSSKrjNU3aexuNRfBBu0' 
});

  */

const uploadCloudinary = async (Localpath)=>{
    try{
        if(!Localpath){
            return null;
        }
       const response = await cloudinary.uploader.upload(Localpath,{
            resource_type: "auto"
        })
        // file is uploaded
        console.log(response.url);
        return response.url;
    }
    catch(error) {
       fs.unlinkSync(Localpath);
       console.log(error);
       return null;
    }
}

export {uploadCloudinary}