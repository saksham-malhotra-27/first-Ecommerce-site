import mongoose from "mongoose";

const connectdb = async ()=>{
    try{ 
     const cdb = await mongoose.connect(process.env.MONGO_URL);
     console.log(`Connected to mongodb Database ${cdb.connection.host}`);
    } 
    catch(err){
       console.log(`Error in mongodb : ${err}`.red)
    }
}

export default connectdb;