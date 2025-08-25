const {Schema} = require("mongoose");
const OrdersSChema = new Schema({
    name: String,
    qty: Number,
    price: Number,
    mode: String,
     

});
module.exports={OrdersSChema};