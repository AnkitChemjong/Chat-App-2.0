import { Server } from "socket.io";
import Message from "./models/messageModel.js";
import Channel from "./models/channelModel.js";
import dotenv from 'dotenv';
dotenv.config();

const setUpSocket=(server)=>{
 const io=new Server(server,{
    cors:{
        origin:process.env.ORIGIN,
        methods:["GET","POST"],
        credentials:true
    }
 });

 const userSocketMap=new Map();

 const disconnect=(socket)=>{
    console.log(`Client disconnected: ${socket.id}`);
    for(const [userId,socketId] of userSocketMap.entries()){
      if(socketId===socket.id){
        userSocketMap.delete(userId);
        break;
      }
    }

 }
 const sendMessage=async(message)=>{
  const senderSocketId=userSocketMap.get(message.sender);
  const recipientSocketId=userSocketMap.get(message.recipient);

  const createMessage=await Message.create(message);
  const messageData=await Message.findById(createMessage._id).populate("sender","_id email firstName lastName image color")
  .populate("recipient","_id email firstName lastName image color")
   if(recipientSocketId){
    //console.log(recipientSocketId)
    io.to(recipientSocketId).emit("receiveMessage",messageData);
  
   }
   if(senderSocketId){
    //console.log(senderSocketId)
    io.to(senderSocketId).emit("receiveMessage",messageData);
   }
 }

const sendChannelMessage=async (message)=>{
  const {channelId,sender,fileUrl,content,messageType}=message;
  const createdMessage=await Message.create({sender,recipient:null,messageType,content,
    fileUrl,timestamp:new Date()});
    const messageData=await Message.findById(createdMessage._id).populate("sender","_id email firstName lastName image color");
  await Channel.findByIdAndUpdate(channelId,{
      $push:{messages:createdMessage._id}
        });
  const channel=await Channel.findById(channelId).populate("members");
  const finalData={...messageData._doc,channelId:channel._id};
  if(channel && channel.members){
    channel.members.forEach((member)=>{
      const memberSocketId=userSocketMap.get(member._id.toString());
      if(memberSocketId){
        io.to(memberSocketId).emit("receive-channel-message",finalData);
      }
    })
    const adminSocketId=userSocketMap.get(channel.admin._id.toString());
      if(adminSocketId){
        io.to(adminSocketId).emit("receive-channel-message",finalData);
      }
  }
};

 io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userId;
    if(userId){
        userSocketMap.set(userId,socket.id);
        console.log(`User Connected: ${userId} with socket ID: ${socket.id}`)
    }
    else{
        console.log("User Id not provided during connection")
    }
    socket.on("sendMessage",sendMessage);
    socket.on("send-channel-message",sendChannelMessage);
    socket.on('disconnect',()=>disconnect(socket))
 })
 
 
}
export default setUpSocket;