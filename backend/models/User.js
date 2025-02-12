const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  profilePic: String,
  links: [
    {
      platform: String,
      url: String,
    },
  ],
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
