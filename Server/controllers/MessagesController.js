import Message from '../models/messageModel.js';
import {renameSync} from 'fs';
class MessageController{
    static getMessages= async (req, res) => {
        try {
          const user1 = req.user.id;
          const user2=req.body.id;
          if (!user1 || !user2) {
            return res.status(404).send("both userIds are required.");
          }
    
          const messages = await Message.find({
            $or: [
              {sender:user1,recipient:user2 },{sender:user2,recipient:user1}]
          }).sort({timestamp:1})
      
    
          return res.status(200).json({ messages });
    
        } catch (e) {
          return res.status(500).send("Error in searchContacts"); // Use 500 for server errors
        }
      }

      static uploadFile= async (req, res) => {
        try {
          if(!req.file){
            return res.status(400).send("File is required");
          }
          const date=Date.now();
          let fileName=`${date}-${req.file.originalname}`;
          renameSync(req.file.path,`uploads/files/${fileName}`);
          return res.status(200).json({fileName:fileName});
        } catch (e) {
          return res.status(500).send("Error in file upload"); // Use 500 for server errors
        }
      }
}

export default MessageController;