require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors')
const HoldingsModel = require('./models/HoldingsModel');
const { PositionsModel } = require("./models/PositionsModel");
const authRoute = require("./Routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;


const app = express();


app.use(bodyparser.json());
app.use(cookieParser());

app.get('/allHoldings',async(req,res)=>{
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
   
});
app.get('/allPositions',async(req,res)=>{
    let allPositions = await  PositionsModel.find({});
    res.json(allPositions);
   
});

app.listen(PORT,()=>{
    console.log("apps started!");
    mongoose.connect(uri);
    console.log("Dbconnected");


});
app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/", authRoute);



