const express = require("express");
const router = express.Router();
const Orders = require("../models/order.model");
const userAuth = require("../middleware/userAuth.middleware");
const ordersController = require("../controller/orders.controller");

//  PLACE ORDER
router.post("/orderData", userAuth, ordersController.createOrder);

router.get("/MyOrderData", userAuth, ordersController.fetchOrderedItems);

module.exports = router;
