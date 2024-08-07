import User from "../models/userModel.js";
import Token from "../services/service.js";


class UserController{
static signup=async (req,res)=>{
    try{
      const {email,password}=req.body;
      if(!email||!password){
        return res.status(401).json({message:"Both email and password are required"});
      }
      const user=await User.create({email:email,password:password});
      const token=Token.createToken(user);
      return res.cookie('cook',token,{maxAge:24*60*60*1000,
                                  secure:true,httpOnly:true,sameSite:false})
                                  .json({message:"Successfully registered",user});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
    }
}

export default UserController;