import User from "../models/userModel.js";
import Token from "../services/service.js";
import bcrypt from 'bcrypt';
import {unlinkSync} from 'fs';


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

      static getUserInfo=async (req,res)=>{
        try{
           const {id}=req.user;
           const userInfo=await User.findOne({_id:id});
          return res.status(200).json({user:userInfo});
        }
        catch(err){
          return res.status(500).json({message:"server error"});
        }
      }

      static updateProfile = async (req, res) => {
        try {
            const { id } = req.user;
            const { firstName, lastName, color } = req.body;
    
            // Ensure all required fields are provided
            if (!firstName || !lastName || color === undefined) {
                return res.status(401).json({ message: "All fields are required" });
            }
    
            // Update the user profile
            const user = await User.findByIdAndUpdate(
                id, // Use the id directly
                { firstName, lastName, color, profileSetup: true },
                { new: true, runValidators: true }
            );
    
            return res.status(200).json({user:user});
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    };
    static addProfileImage = async (req, res) => {
      try {
           const {id}=req.user;
           if(!req.file){
            return res.status(400).send("File is Required");
           }
           const fileName=`profiles/${req.file.filename}`;
           const updateUser=await User.findByIdAndUpdate(id,{image:fileName},{
            new:true,runValidators:true
           })
           return res.status(200).json({image:updateUser.image});
      } catch (err) {
          return res.status(500).json({ message: err.message });
      }
  };

  static removeProfileImage = async (req, res) => {
    try {
       const { id } = req.user;
       const user=await User.findById(id);
       if(!user){
        return res.status(404).json({message:"User not found"})
       }
       if(user.image){
          unlinkSync(`uploads/${user.image}`)
       }
       user.image=null;
       await user.save();
       return res.status(200).json({message:"Profile image removed successfully"});
     } 
    catch(err) {
      console.log(err)
        return res.status(500).json({ message: err.message });
    }
};
  

}

export default UserController;