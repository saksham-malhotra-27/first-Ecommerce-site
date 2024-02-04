import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage =  multer.diskStorage({
    destination: function (req,file,cb){
    const destinationPath = path.join(__dirname, '../../frontend/public');
    console.log('Destination Path:', destinationPath);
        cb(null, destinationPath )
    }, 

    filename:  function (req, file,cb){
        console.log('File:', file);

        cb(null, file.originalname);
    }
})

export const upload = multer ({storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB limit
    }
})

