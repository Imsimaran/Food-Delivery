import FoodItem from "../models/foodItem.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// CREATE a new Food Item
export async function createFoodItem(req, res) {
  try {
    const {
      name,
      price,
      description,
      vegOnly,
      restaurant,
      category,
      availability,
      ratings,
    } = req.body;

    const avatarUrl = req.file?.path;
    if (!avatarUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const cloudinaryResponse = await uploadOnCloudinary(avatarUrl);
    if (!cloudinaryResponse) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const foodItem = await FoodItem.create({
      name,
      price,
      description,
      vegOnly,
      restaurant,
      category,
      imageUrl: cloudinaryResponse.url,
      availability,
      ratings,
    });

    res.status(200).send({
      message: "Food item created successfully",
      foodItem,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error creating food item",
      error: err.message,
    });
  }
}

// GET all food items by Restaurant ID
export async function getAllFoodItemByRestaurant(req, res) {
  const { id } = req.params;
  try {
    const foodItems = await FoodItem.find({ restaurant: id });

    if (!foodItems || foodItems.length === 0) {
      return res.status(404).send({
        message: "Food items not found for this restaurant",
      });
    }

    res.status(200).send({
      message: "Food items fetched successfully",
      foodItems,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error fetching food items",
      error: err.message,
    });
  }
}

// UPDATE a Food Item
export async function updateFoodItem(req, res) {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (req.file) {
      const avatarUrl = req.file.path;
      const cloudinaryResponse = await uploadOnCloudinary(avatarUrl);

      if (!cloudinaryResponse) {
        return res.status(400).json({ message: "Image upload failed" });
      }

      updateFields.imageUrl = cloudinaryResponse.url;
    }

    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const foodItem = await FoodItem.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json({
      message: "Food item updated successfully",
      foodItem,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating food item",
      error: err.message,
    });
  }
}

// DELETE a Food Item
export async function deleteFoodItem(req, res) {
  const { id } = req.params;
  try {
    await FoodItem.findByIdAndDelete(id);
    res.status(200).send({ message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: "Error deleting food item",
      error: err.message,
    });
  }
}

// GET single Food Item by ID
export async function getFoodItemById(req, res) {
  const { id } = req.params;
  try {
    const foodItem = await FoodItem.findById(id);
    if (!foodItem) {
      return res.status(404).send({ message: "Food item not found" });
    }
    res.status(200).send({
      message: "Food item fetched successfully",
      foodItem,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error fetching food item",
      error: err.message,
    });
  }
}
