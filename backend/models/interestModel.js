// interestedLand.js

const mongoose = require('mongoose');

const interestedLandSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  landId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Land',
    required: true,
  },
  landDetails: {
    type: Object,
    required: true,
  },
});

const InterestedLand = mongoose.model('InterestedLand', interestedLandSchema);

module.exports = InterestedLand;
