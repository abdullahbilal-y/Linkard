const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Link = require("../models/Link");

// ✅ Get user by ID
router.get("/id/:userId", async (req, res) => {
    try {
        console.log(`🔍 Searching for user by ID: ${req.params.userId}`);
        const user = await User.findById(req.params.userId);

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

// ✅ Update user details or links
// ✅ Update user details or links
router.put("/id/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, username, profilePic, links } = req.body;

        console.log(`🔄 Updating user with ID: ${userId}`);

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, username, profilePic },
            { new: true }
        );

        if (!updatedUser) {
            console.log("❌ User not found");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ User details updated:", updatedUser);

        // Update links if provided
        if (links && Array.isArray(links)) {
            console.log("🔄 Updating links for user...");
            await Link.deleteMany({ userId }); // Delete existing links
            const newLinks = links.map((link) => ({
                platform: link.platform, // Ensure platform is included
                url: link.url,
                userId,
            }));
            const createdLinks = await Link.insertMany(newLinks);
            console.log("✅ Links updated:", createdLinks);
        }

        res.status(200).json({ message: "User and links updated successfully", user: updatedUser });
    } catch (err) {
        console.error("❌ Error updating user or links:", err);
        res.status(500).json({ error: "Failed to update user or links" });
    }
});

module.exports = router;