// interestedLandController.js

const InterestedLand = require('../models/interestModel');

const registerInterest = async (req, res) => {
  try {
    const { userId, landId, landDetails } = req.body;

    // Check if the user has already registered interest in this land
    const existingInterest = await InterestedLand.findOne({ userId, landId });

    if (existingInterest) {
      return res.status(400).json({ message: 'You have already registered interest in this land' });
    }

    // Create a new interest entry
    const newInterest = new InterestedLand({
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

// const deleteInterestById = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const interest = await InterestedLand.findById(id);

//     if (!interest) {
//       return res.status(404).json({ message: 'Interest not found' });
//     }

//     await interest.remove();
//     res.status(200).json({ message: 'Interest deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const  deleteInterestById = async (req, res) => {
    const id = req.params.id;
  
    try {
      const like = await InterestedLand.findById(id);
  
      if (!like) {
        return res.status(404).json({ message: 'Like not found' });
      }
  
      await InterestedLand.deleteOne({ _id: id }); // Use deleteOne to remove the like
      res.status(200).json({ message: 'Like deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getAllInterestsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const interests = await InterestedLand.find({ userId });

    res.json(interests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerInterest, deleteInterestById, getAllInterestsByUserId };
