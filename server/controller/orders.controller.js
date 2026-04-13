const {
  createOrderService,
  getOrdersService,
} = require("../services/orders.service");

exports.createOrder = async (req, res) => {
  try {
    const data = {
      email: req.user.email,
      order_data: req.body.order_data,
      order_date: req.body.order_date,
    };

    const result = await createOrderService(data);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
};

exports.fetchOrderedItems = async (req, res) => {
  try {
    const result = await getOrdersService(req.user.email);
    console.log(">>>>>>", result);

    res.status(200).json({
      orderData: {
        order_data: result.orders?.order_data || [],
      },
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
};
