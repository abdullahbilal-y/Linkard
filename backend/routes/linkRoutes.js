// filepath: e:\webbapp Project\linkard\backend\routes\linkRoutes.js
const express = require("express");
const router = express.Router();
const Link = require("../models/Link"); // Ensure the Link model is correctly imported

// Fetch all links
router.get("/", async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch links" });
  }
});

// Add a new link
router.post("/", async (req, res) => {
  try {
    const { title, url, userId } = req.body;
    if (!title || !url || !userId) {
      return res.status(400).json({ error: "Title, URL, and userId are required" });
    }

    const newLink = new Link({ title, url, userId });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ error: "Failed to add link" });
  }
});

// Delete a link
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLink = await Link.findByIdAndDelete(id);
    if (!deletedLink) {
      return res.status(404).json({ error: "Link not found" });
    }
    res.status(200).json({ message: "Link deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete link" });
  }
});

// Update a link
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;
    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { title, url },
      { new: true }
    );
    if (!updatedLink) {
      return res.status(404).json({ error: "Link not found" });
    }
    res.status(200).json(updatedLink);
  } catch (err) {
    res.status(500).json({ error: "Failed to update link" });
  }
});

module.exports = router;