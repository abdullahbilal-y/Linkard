const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
    title: String,
    url: String,
    userId: String, // This links the link to a specific user
});

module.exports = mongoose.model("Link", LinkSchema);
