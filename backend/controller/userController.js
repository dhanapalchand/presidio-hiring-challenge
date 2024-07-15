const User = require("../models/userModel");

const getOneUserById = async (req, res) => {
    const id = req.params.id;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'user details not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    getOneUserById
  };