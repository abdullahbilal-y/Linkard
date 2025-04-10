const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
  username: { type: String, unique: true, required: true },
  profilePic: { type: String, default: "" },
  links: [
    {
      platform: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
