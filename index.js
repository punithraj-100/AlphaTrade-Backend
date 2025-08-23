require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.listen(PORT,()=>{
    console.log("apps started!");
    mongoose.connect(uri);
    console.log("Dbconnected");


});