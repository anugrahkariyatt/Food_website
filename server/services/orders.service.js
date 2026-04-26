const Orders = require("../models/order.model");
const redisClient = require("../config/redis.config");

const createOrderService = async (data) => {
  const { order_data, order_date, email } = data;

  // validation
  if (!order_data || !order_date) {
    const error = new Error("Missing required fields");
    error.statusCode = 400;
    throw error;
  }

  // prepare order array
  let orderDataArr = [...order_data];
  orderDataArr.unshift({ Order_date: order_date });

  // check existing order
  const existingOrder = await Orders.findOne({ email });

  if (!existingOrder) {
    await Orders.create({
      email,
      order_data: [orderDataArr],
    });
  } else {
    await Orders.findOneAndUpdate(
      { email },
      { $push: { order_data: orderDataArr } },
    );
  }
  await redisClient.del(`orders:${email}`);

  return {
    message: "Order Placed Successfully",
  };
};

const getOrdersService = async (email) => {
  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  const cacheKey = `orders:${email}`;

  console.time("Total Fetch Time");

  //  Redis check
  console.time("Redis Fetch Time");
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    console.timeEnd("Redis Fetch Time");
    console.log("Cache HIT");
    return JSON.parse(cachedData);
  }

  console.timeEnd("Redis Fetch Time");
  console.log("Cache MISS → DB");

  //  DB fetch
  console.time("MongoDB Fetch Time");
  const orders = await Orders.findOne({ email }).lean();
  console.timeEnd("MongoDB Fetch Time");

  const result = {
    orders: orders || [],
  };

  await redisClient.setEx(cacheKey, 300, JSON.stringify(result));

  console.timeEnd("Total Fetch Time");

  return result;
};

module.exports = { createOrderService, getOrdersService };
