const redis = require("redis");
require("dotenv").config();

let client;
let isConnected = false;

if (process.env.REDIS_URL) {
  client = redis.createClient({
    url: process.env.REDIS_URL,
  });

  client.on("error", () => {
    isConnected = false;
  });

  client
    .connect()
    .then(() => {
      isConnected = true;
      console.log("Connected to Redis Successfully");
    })
    .catch(() => {
      isConnected = false;
      console.log("Redis not working, using MongoDB instead");
    });
}

const redisClient = {
  get: async (key) => {
    if (!isConnected) return null;
    try {
      return await client.get(key);
    } catch (err) {
      return null;
    }
  },

  setEx: async (key, time, value) => {
    if (!isConnected) return null;
    try {
      return await client.setEx(key, time, value);
    } catch (err) {
      return null;
    }
  },

  del: async (key) => {
    if (!isConnected) return null;
    try {
      return await client.del(key);
    } catch (err) {
      return null;
    }
  },
};

module.exports = redisClient;
