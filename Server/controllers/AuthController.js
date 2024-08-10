import User from "../models/userModel.js";
import Token from "../services/service.js";
import bcrypt from 'bcrypt';


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
    static login=async (req,res)=>{
      try{
        const {email,password}=req.body;
        if(!email||!password){
          return res.status(401).json({message:"Both email and password are required"});
        }
        const user=await User.findOne({email});
        if(!user){
          return res.status(401).json({message:"User is not found "});
        }
        const match=bcrypt.compare(user.password,password);
        if(!match){
          return res.status(401).json({message:"Password doesnat match"});
        }
        const token=Token.createToken(user);
        return res.cookie('cook',token,{maxAge:24*60*60*1000,
                                    secure:true,httpOnly:true,sameSite:false})
                                    .json({message:"Successfully login",user});
      }
      catch(err){
          return res.status(500).json({message:err.message});
      }
      }

      static getUserInfo=(req,res)=>{
        try{
             return res.status(200).json({user:req.user});
        }
        catch(err){
          return res.status(500).json({message:"server error"});
        }
      }

}

export default UserController;