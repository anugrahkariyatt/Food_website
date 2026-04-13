const { fetchFoodDataService } = require("../services/menuItems.service");

exports.fetchFoodData = async (req, res) => {
  try {
    const data = await fetchFoodDataService();

    res.status(200).json(data);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};
