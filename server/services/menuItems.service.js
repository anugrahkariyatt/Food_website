const mongoose = require("mongoose");
const redisClient = require("../config/redis.config");

const fetchFoodDataService = async () => {
  console.time("Total Fetch Time");

  // Check Redis cache
  console.time("Redis Fetch Time");
  const cachedData = await redisClient.get("menuData");

  if (cachedData) {
    console.timeEnd("Redis Fetch Time");
    console.log("Cache hit: Returning cached data");

    return JSON.parse(cachedData);
  }

  console.timeEnd("Redis Fetch Time");
  console.log("Cache miss: Fetching from DB");

  //  Fetch from DB
  console.time("MongoDB Fetch Time");

  const foodItems = await mongoose.connection.db
    .collection("newFoodData")
    .find({})
    .toArray();

  const category = await mongoose.connection.db
    .collection("foodCategory")
    .find({})
    .toArray();

  console.timeEnd("MongoDB Fetch Time");

  const responseData = [foodItems, category];

  // Store in Redis (1 hour expiry)
  await redisClient.setEx(
    "menuData",
    3600,
    JSON.stringify(responseData)
  );

  console.timeEnd("Total Fetch Time");

  // Return data
  return responseData;
};

module.exports = { fetchFoodDataService };