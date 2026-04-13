const { addNewFoodService } = require("../services/admin.services");

exports.addNewFood = async (req, res) => {
  try {
    const result = await addNewFoodService({
      file: req.file,
      body: req.body,
    });

    res.status(201).json({
      success: true,
      message: result.message,
      food: result.food,
      imageUrl: result.imageUrl,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
};
