// filepath: e:\webbapp Project\linkard\backend\routes\linkRoutes.js
const express = require("express");
const router = express.Router();
const Link = require("../models/Link"); // Ensure the Link model is correctly imported

router.get("/api/links", async (req, res) => {
  try {
    const links = await Link.find(); // Assuming Link is your model
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
});

module.exports = router;