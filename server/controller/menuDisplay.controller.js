const mongoose = require("mongoose");
const redisClient = require("../config/redis.config");

exports.fetchFoodData = async (req, res) => {
  console.time("MongoDB Fetch Time");
  try {
    console.time("Redis Fetch Time");
    const cachedData = await redisClient.get("menuData");
    if (cachedData) {
      console.timeEnd("Redis Fetch Time");
      console.log("Cache hit: Returning cached data");
      return res.send(JSON.parse(cachedData));
    }
    console.log("DB hit: Fetching Food Data");
    console.time("MongoDB Fallback Time");
    const foodItems = await mongoose.connection.db
      .collection("newFoodData")
      .find({})
      .toArray();

    const category = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();

    const responseData = [foodItems, category];
    await redisClient.setEx("menuData", 3600, JSON.stringify(responseData));
    console.timeEnd("MongoDB Fallback Time");
    res.status(200).send(responseData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
