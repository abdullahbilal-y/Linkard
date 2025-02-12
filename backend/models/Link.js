const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  platform: String,
  url: String,
});

module.exports = mongoose.models.Link || mongoose.model("Link", LinkSchema);
