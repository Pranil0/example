const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  verified: { type: Boolean, default: false },  // changed from isVerified
  verificationToken: String,
  tokenExpiry: Date,
});

module.exports = mongoose.model("User", userSchema);
