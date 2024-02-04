import bcrypt from "bcrypt";
export const hashpass = async (password) =>{
    try{
        const hashrounds = 10;
        const hashpassword = await bcrypt.hash(password, hashrounds);
        return hashpassword;
    }
    catch(err){
        console.log(err);
    }
};

export const comparePassword = async (password, hashpassword)=>{
  return bcrypt.compare(password, hashpassword);
}