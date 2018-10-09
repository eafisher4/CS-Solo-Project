const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  activities: { type: [String], required: false },
});

module.exports = mongoose.model('RatingsData', ratingSchema);
