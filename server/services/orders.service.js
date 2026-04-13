const Orders = require("../models/order.model");

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

  return {
    message: "Order Placed Successfully",
  };
};

//  PLACE ORDER
const fetchOrderedService = async (data) => {
  const { order_data, order_date, email } = data;

  if (!order_data || !order_date) {
    const error = new Error("Missing required fields");
    error.statusCode = 400;
    throw error;
  }

  let orderDataArr = [...order_data];
  orderDataArr.unshift({ Order_date: order_date });

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

  // return result
  return {
    message: "Order Placed Successfully",
  };
};

module.exports = { createOrderService, fetchOrderedService };
