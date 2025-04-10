const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure this path is correct
const Link = require("../models/Link"); // Ensure this path is correct

// ✅ Get user by username
router.get("/:username", async (req, res) => {
    try {
        console.log(`🔍 Searching for user: ${req.params.username}`);
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ User found:", user);
        res.json(user);
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get all links for a user
router.get("/links/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(`🔍 Fetching links for user ID: ${userId}`);

        const links = await Link.find({ userId });

        if (!links.length) {
            console.log("❌ No links found");
            return res.status(404).json({ error: "No links found" });
        }

        console.log("✅ Links found:", links);
        res.json(links);
    } catch (err) {
        console.error("❌ Error fetching links:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
