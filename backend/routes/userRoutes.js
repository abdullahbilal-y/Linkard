const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model

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
