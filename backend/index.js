const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Doctor = require("./models/Doctor");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 1. Add doctor API
app.post("/api/add-doctor", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. List doctors with filter API (with pagination)
app.get("/api/list-doctor-with-filter", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter parameters
    const filter = {};
    if (req.query.speciality) filter.speciality = req.query.speciality;
    if (req.query.location) filter.location = req.query.location;
    if (req.query.availability) filter.availability = req.query.availability;

    // Get filtered doctors with pagination
    const doctors = await Doctor.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Doctor.countDocuments(filter);

    res.json({
      doctors,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalDoctors: total
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});