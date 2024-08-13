import User from '../models/userModel.js';

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
}

export default ContactController;
