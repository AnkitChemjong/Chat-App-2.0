import User from '../models/userModel.js';
import Message from '../models/messageModel.js';
import mongoose from 'mongoose';

class ContactController {
  static searchContacts = async (req, res) => {
    try {
      const { searchTerm } = req.body;
      if (searchTerm === undefined || searchTerm === null) {
        return res.status(404).send("searchTerm is required.");
      }

      const sanitizedSearchTerm = searchTerm.replace(
        /[.*+?^${}()|[\]\\]/g, "\\$&"
      ); // To remove all the special characters in the string

      const regex = new RegExp(sanitizedSearchTerm, "i");
  

      const contacts = await User.find({
        $and: [
          { _id: { $ne:req.user.id } }, // Changed from req.id to req.userId
          {
            $or: [{ firstName: regex }, { lastName: regex }, { email: regex }]
          }
        ]
      });
  

      return res.status(200).json({ contacts });

    } catch (e) {
      return res.status(500).send("Error in searchContacts"); // Use 500 for server errors
    }
  }

  static getContactsForDMList = async (req, res) => {
    try {
        let userId = req.user.id;
        userId = new mongoose.Types.ObjectId(userId);

        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [{ sender: userId }, { recipient: userId }]
                }
            },
            {
                $sort: { timestamp: 1 }
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender"
                        }
                    },
                    lastMessageTime: { $first: "$timestamp" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "contactInfo"
                }
            },
            {
                $unwind: "$contactInfo"
            },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    email: "$contactInfo.email",
                    firstName: "$contactInfo.firstName",
                    lastName: "$contactInfo.lastName",
                    image: "$contactInfo.image",
                    color: "$contactInfo.color"
                }
            },
            {
                $sort: { lastMessageTime: -1 }
            }
        ]);

        return res.status(200).json({ contacts });
    } catch (e) {
        console.error('Error in getContactsForDMList:', e);
        return res.status(500).send("Error in searchContacts");
    }
}

static getAllContacts = async (req, res) => {
  try {
    const users =await User.find({_id:{$ne:req.user.id}}).select("firstName lastName _id email");
   
    const contacts=users.map((user)=>({
      label:user.firstName? `${user.firstName} ${user.lastName}`:user.email,value:user._id
    }))

    return res.status(200).json({ contacts });

  } catch (e) {
    return res.status(500).send("Error in get all Contacts"); // Use 500 for server errors
  }
}


}

export default ContactController;
