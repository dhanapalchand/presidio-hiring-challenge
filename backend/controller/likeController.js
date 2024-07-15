  const Like = require('../models/likeModel.js');

// Like a land


const likeLand = async (req, res) => {
    try {
      const { userId, landId, landDetails } = req.body;
  
      // Check if the user has already registered interest in this land
      const existingInterest = await Like.findOne({ userId, landId });
  
      if (existingInterest) {
        return res.status(400).json({ message: 'You have already like in this land' });
      }
  
      // Create a new interest entry
      const newInterest = new Like({
        userId,
        landId,
        landDetails,
      });
  
      await newInterest.save();
  
      res.status(201).json({ message: 'Interest registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get all likes by user ID
const getLikesByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const likes = await Like.find({ userId });
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a like by ID
const deleteLikeById = async (req, res) => {
    const id = req.params.id;
  
    try {
      const like = await Like.findById(id);
  
      if (!like) {
        return res.status(404).json({ message: 'Like not found' });
      }
  
      await Like.deleteOne({ _id: id }); // Use deleteOne to remove the like
      res.status(200).json({ message: 'Like deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const getAllLikes = async (req, res) => {
    try {
        // Fetch all like details from the database
        const likes = await Like.find();
        res.status(200).json(likes); // Send the likes as JSON response
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Send error response if something goes wrong
    }
};
module.exports = {
  likeLand,
  getLikesByUserId,
  deleteLikeById,
  getAllLikes,
};
