const {
  createOrderService,
  fetchOrderedService,
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
    const data = {
      email: req.user.email,
      order_data: req.body.order_data,
      order_date: req.body.order_date,
    };

    const result = await fetchOrderedService(data);

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
