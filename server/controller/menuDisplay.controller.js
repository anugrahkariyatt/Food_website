const mongoose = require("mongoose");

exports.fetchFoodData = async (req, res) => {
  console.time("MongoDB Fetch Time");
  try {
    const foodItems = await mongoose.connection.db
      .collection("newFoodData")
      .find({})
      .toArray();

    const category = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();
console.timeEnd("MongoDB Fetch Time");
    res.send([foodItems, category]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

