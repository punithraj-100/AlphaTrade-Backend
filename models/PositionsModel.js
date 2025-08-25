const { model } = require("mongoose");
const { PositionsSchema } = require("../schemas/PositionsSchema");

const PositionsModel = model("positions", PositionsSchema); 
// 👆 collection will be "positions"

module.exports = { PositionsModel };
