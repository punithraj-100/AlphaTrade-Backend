const {Schema} = require("mongoose");
const OrdersSChema = new Schema({
     name: String,
    price: Number,
    percent: Number,
    isDown: Boolean,
     

});
module.exports={OrdersSChema};