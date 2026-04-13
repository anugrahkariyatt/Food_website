const streamifier = require("streamifier");
const FoodItem = require("../models/foodItem.model");
const cloudinary = require("../config/cloudinary.config");

const addNewFoodService = async (data) => {
  if (!data.file) {
    const error = new Error("No image uploaded");
    error.statusCode = 400;
    throw error;
  }

  // upload to cloudinary

  const streamUpload = (file) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "food_items",
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  };
  const result = await streamUpload(data.file);
  const imageUrl = result.secure_url;

  let optionsData;
  try {
    optionsData = JSON.parse(data.body.options);
  } catch (e) {
    const error = new Error("Invalid options format");
    error.statusCode = 400;
    throw error;
  }

  const newFood = await FoodItem.create({
    name: data.body.name,
    CategoryName: data.body.CategoryName,
    img: imageUrl,
    options: optionsData,
    description: data.body.description,
  });
  return {
    message: "Food item added successfully",
    food: newFood,
    imageUrl,
  };
};

module.exports = { addNewFoodService };
