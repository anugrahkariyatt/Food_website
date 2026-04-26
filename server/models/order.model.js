const mongoose = require("mongoose");

const { Schema } = mongoose;
const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("orders", OrderSchema);
