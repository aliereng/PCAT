const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    type: String,
    default: "default.png"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Photo', PhotoSchema);
