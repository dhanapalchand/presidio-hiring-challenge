const mongoose = require('mongoose');

const landDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  place: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  numberOfBedrooms: {
    type: Number,
    required: true
  },
  numberOfBathrooms: {
    type: Number,
    required: true
  },
  nearbyHospitals: {
    type: Boolean,
    default: false
  },
  nearbyColleges: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
    imgUrl: {
    type: String,
    
  },
});

const LandDetails = mongoose.model('LandDetails', landDetailsSchema);

module.exports = LandDetails;
