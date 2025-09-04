require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
// --- FIX: Import the 'node-fetch' package ---
// This line gives your backend server the ability to use the fetch command.
const fetch = require('node-fetch'); 
const HoldingsModel = require('./models/HoldingsModel');
const { PositionsModel } = require("./models/PositionsModel");
const {WatchlistModel} = require("./models/WatchlistModel");
const { OrdersModel } = require("./models/OrdersModel"); 
const authRoute = require("./Routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// --- MIDDLEWARE SETUP ---
app.use(
  cors({
    origin: ["https://alpha-trade-frontend.vercel.app", "https://alpha-trade-dash-board.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// --- YOUR EXISTING ROUTES (UNCHANGED) ---
app.use("/", authRoute); 

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

app.get('/watchlist', async(req, res)=>{
  try{
    let watchlistData = await WatchlistModel.find({});
    res.json(watchlistData);
  } catch (error) {
        res.status(500).json({ message: "Failed to fetch watchList", error });
    }
});

//saving newOrder data to DB from dashboard
app.post("/newOrder", async(req, res)=>{

    let newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    });
    newOrder.save();
    res.send("Order received!");
    console.log("newOrder data",req.body);
});

// --- NEW CHATBOT PROXY ROUTE ---
app.post('/ask-chatbot', async (req, res) => {
  try {
    const { payload } = req.body;
    if (!payload) {
      return res.status(400).json({ error: 'Payload is required' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set in the .env file.");
      return res.status(500).json({ error: 'Server configuration error: Missing API key.' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error("Gemini API Error:", errorBody);
      throw new Error(`Gemini API request failed with status ${geminiResponse.status}`);
    }

    const result = await geminiResponse.json();
    res.json(result);

  } catch (error) {
    console.error("Chatbot proxy error:", error);
    res.status(500).json({ error: 'Failed to get a response from the chatbot.' });
  }
});

// --- SERVER START & DATABASE CONNECTION ---
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
    mongoose.connect(uri)
        .then(() => console.log("MongoDB connected successfully."))
        .catch(err => console.error("MongoDB connection error:", err));
});


    

