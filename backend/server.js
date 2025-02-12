require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// API route to fetch links
app.get("/api/links", async (req, res) => {
  try {
    const links = await Link.find(); // Fetch all links from MongoDB
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// API route to add a new link
app.post("/api/links", async (req, res) => {
  try {
    const { title, url, userId } = req.body;
    const newLink = new Link({ title, url, userId });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(500).json({ error: "Failed to add link" });
  }
});


const Link = require("./models/Link"); // Make sure you have a Link model

// API Endpoint to Add Links
app.post("/api/links", async (req, res) => {
  try {
    const { title, url, userId } = req.body;
    if (!title || !url) {
      return res.status(400).json({ error: "Title and URL are required" });
    }

    const newLink = new Link({ title, url, userId });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (error) {
    console.error("Error adding link:", error);
    res.status(500).json({ error: "Failed to add link" });
  }
});

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
