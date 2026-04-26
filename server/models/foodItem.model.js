const mongoose = require("mongoose");

const { Schema } = mongoose;

const FoodItemSchema = new Schema({
  CategoryName: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("newFoodData", FoodItemSchema);
