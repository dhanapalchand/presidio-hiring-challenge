const LandDetails = require('../models/landModel');

// Controller function to get all land details
const getLand = async (req, res) => {
  try {
    const landDetails = await LandDetails.find();
    res.json(landDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to add new land details
const addLand = async (req, res) => {
  const { place, area, numberOfBedrooms, numberOfBathrooms, nearbyHospitals, nearbyColleges, price } = req.body;
  const userId = req.user._id; // Assuming the user ID is available in req.user

  try {
    const newLand = new LandDetails({
      user: userId,
      place,
      area,
      numberOfBedrooms,
      numberOfBathrooms,
      nearbyHospitals,
      nearbyColleges,
      price
    });

    const savedLand = await newLand.save();
    res.status(201).json(savedLand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to get land details by user:id
const getLandById = async (req, res) => {
   
        const userId = req.params.userId; // Assuming you pass userId in the URL params
      
        try {
          const lands = await LandDetails.find({ user: userId });
          if (!lands || lands.length === 0) {
            return res.status(404).json({ message: 'No land details found for this user' });
          }
          res.json(lands);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };
  
      const getOneLandById = async (req, res) => {
        const id = req.params.id;
      
        try {
          const land = await LandDetails.findById(id);
          if (!land) {
            return res.status(404).json({ message: 'Land details not found' });
          }
          res.json(land);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };
// Controller function to update land details
const updateLand = async (req, res) => {
  const id = req.params.id;
  const { place, area, numberOfBedrooms, numberOfBathrooms, nearbyHospitals, nearbyColleges, price } = req.body;

  try {
    const updatedLand = await LandDetails.findByIdAndUpdate(id, {
      place,
      area,
      numberOfBedrooms,
      numberOfBathrooms,
      nearbyHospitals,
      nearbyColleges,
      price
    }, { new: true });

    if (!updatedLand) {
      return res.status(404).json({ message: 'Land details not found' });
    }
    res.json(updatedLand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to delete land details
const deleteLand = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedLand = await LandDetails.findByIdAndDelete(id);
    if (!deletedLand) {
      return res.status(404).json({ message: 'Land details not found' });
    }
    res.json({ message: 'Land details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLand,
  addLand,
  getLandById,
  updateLand,
  deleteLand,
  getOneLandById
};
