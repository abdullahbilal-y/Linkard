const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // Add the platform field
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
});

module.exports = mongoose.model("Link", LinkSchema);