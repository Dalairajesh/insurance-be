const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
