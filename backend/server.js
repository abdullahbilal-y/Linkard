require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // Replace with your frontend's URL
app.use(express.json());

const PORT = process.env.PORT || 3001; // Ensure it's 3001

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Models
const Link = require("./models/Link"); // ✅ Corrected: Require models at the top

// Routes
const userRoutes = require("./routes/userRoutes"); // ✅ Only require it once
app.use("/api/user", userRoutes);

const linkRoutes = require("./routes/linkRoutes");
app.use(linkRoutes);

// Debugging to ensure routes are working
console.log("✅ Routes loaded");

// Root Route (Just to test if backend is running)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// API route to fetch all links
app.get("/api/links", async (req, res) => {
  try {
    const links = await Link.find(); // Fetch all links from MongoDB
    res.json(links);
  } catch (error) {
    console.error("❌ Error fetching links:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// API route to add a new link
app.post("/api/links", async (req, res) => {
  try {
    const { title, url, userId } = req.body;
    if (!title || !url || !userId) {
      return res.status(400).json({ error: "Title, URL, and userId are required" });
    }

    const newLink = new Link({ title, url, userId });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    console.error("❌ Error adding link:", error);
    res.status(500).json({ error: "Failed to add link" });
  }
});

// Start Server (Ensure it is called only once)
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
