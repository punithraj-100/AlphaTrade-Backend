require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const HoldingsModel = require('./models/HoldingsModel');
const { PositionsModel } = require("./models/PositionsModel");
const {WatchlistModel} = require("./models/WatchlistModel")
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

app.get('/watchlist', async(req, res)=>{
  try{
    let watchlistData = await WatchlistModel.find({});
    res.json(watchlistData);
  } catch (error) {
        res.status(500).json({ message: "Failed to fetch watchList", error });
    }
});



// --- SERVER START & DATABASE CONNECTION ---
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
    mongoose.connect(uri)
        .then(() => console.log("MongoDB connected successfully."))
        .catch(err => console.error("MongoDB connection error:", err));
});





// app.get("/watchlistData", async(req, res)=>{
//     const watchlist = [
//         {
//           name: "INFY",
//           price: 1555.45,
//           percent: "-1.60%",
//           isDown: true,
//         },
//         {
//           name: "ONGC",
//           price: 116.8,
//           percent: "-0.09%",
//           isDown: true,
//         },
//         {
//           name: "TCS",
//           price: 3194.8,
//           percent: "-0.25%",
//           isDown: true,
//         },
//         {
//           name: "KPITTECH",
//           price: 266.45,
//           percent: "3.54%",
//           isDown: false,
//         },
//         {
//           name: "QUICKHEAL",
//           price: 308.55,
//           percent: "-0.15%",
//           isDown: true,
//         },
//         {
//           name: "WIPRO",
//           price: 577.75,
//           percent: "0.32%",
//           isDown: false,
//         },
//         {
//           name: "M&M",
//           price: 779.8,
//           percent: "-0.01%",
//           isDown: true,
//         },
//         {
//           name: "RELIANCE",
//           price: 2112.4,
//           percent: "1.44%",
//           isDown: false,
//         },
//         {
//           name: "HUL",
//           price: 512.4,
//           percent: "1.04%",
//           isDown: false,
//         },
//       ];

      
//         watchlist.forEach((data)=>{
//             let watchlistdata = new WatchlistModel({
//                 name: data.name,
//                 price: data.price,
//                 percent: data.percent,
//                 isDown: data.isDown,
//             });
//             watchlistdata.save();
//         }) ; 
//         res.send("done!");  
     
// });







