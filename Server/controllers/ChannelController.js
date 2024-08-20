import Channel from "../models/channelModel.js";
import User from "../models/userModel.js";
import mongoose from 'mongoose';

class ChannelController{
    static createChannel=async (req,res)=>{

        try{
            const {name,members}=req.body;
            const userId=req.user.id;
            const admin=await User.findById(userId);
            if(!admin){
                return res.status(404).send("Admin user not found.")
            }
            const validMembers=await User.find({_id:{$in:members}});

            if(validMembers.length!==members.length){
                return res.status(404).send("Some members are not valid users.")
            }
            const newChannel=new Channel({
                name,
                members,
                admin:userId
            })
            await newChannel.save();
            await res.status(201).json({channel:newChannel})
        }
        catch(e){
          return res.status(500).json({message:"Channel Creation failed",});
        }
      }

      static getUserChannels=async (req,res)=>{

        try{
           const userId=new mongoose.Types.ObjectId(req.user.id);//not necessary
            const channels=await Channel.find({
                $or:[{admin:userId},{members:userId}]
            }).sort({updatedAt: -1})
           
            await res.status(200).json({channels})
        }
        catch(e){
          return res.status(500).json({message:"Channel Creation failed",});
        }
      }
      static getChannelMessages=async (req,res)=>{

        try{

          const {channelId}=req.params;
          const channel=await Channel.findById(channelId).populate({path:"messages",
        populate:{
          path:"sender",
          select:"firstName lastName email _id image color"
        }})
        if(!channel){
          return res.status(404).send("Channel not found.")
        }
        const messages=channel.messages;
        return res.status(200).json({messages})
        }
        catch(e){
          return res.status(500).json({message:"Channel Creation failed",});
        }
      }
}

export default ChannelController;