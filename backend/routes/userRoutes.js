const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const Link = require("../models/Link"); // Import Link model

// ✅ Move this route to the top
// Get all links for a specific user
router.get("/links/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const links = await Link.find({ userId });

        if (!links.length) {
            return res.status(404).json({ error: "No links found" });
        }

        res.json(links);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// GET user data by username
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
