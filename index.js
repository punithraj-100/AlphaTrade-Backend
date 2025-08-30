require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const HoldingsModel = require('./models/HoldingsModel');
const { PositionsModel } = require("./models/PositionsModel");
const authRoute = require("./Routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// --- MIDDLEWARE SETUP ---
// All middleware should be placed at the top, before any routes.
// This ensures every request is processed correctly.

// 1. Configure CORS to allow requests from your frontend applications.
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 2. Middleware to parse JSON bodies and cookies from incoming requests.
app.use(express.json()); // Replaces the need for body-parser
app.use(cookieParser());


// --- ROUTES ---
// Routes should be defined AFTER the middleware setup.

app.use("/", authRoute); // Handles /login, /signup, etc.

app.get('/allHoldings', async (req, res) => {
    try {
        let allHoldings = await HoldingsModel.find({});
        res.json(allHoldings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch holdings", error });
    }
});

app.get('/allPositions', async (req, res) => {
    try {
        let allPositions = await PositionsModel.find({});
        res.json(allPositions);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch positions", error });
    }
});


// --- SERVER START & DATABASE CONNECTION ---
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
    mongoose.connect(uri)
        .then(() => console.log("MongoDB connected successfully."))
        .catch(err => console.error("MongoDB connection error:", err));
});




