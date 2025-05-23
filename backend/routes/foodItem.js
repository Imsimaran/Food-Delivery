import { Router } from "express";
const router = Router();
import {
  createFoodItem,
  getAllFoodItemByRestaurant,
  updateFoodItem,
  deleteFoodItem,
  getFoodItemById,
} from "../controllers/food.js";
import multer from "multer";

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 50 * 1024 * 1024, // 50mb size limit
  },
}).single("avatar");

router.post("/", upload, createFoodItem);
router.get("/restaurant/:id", getAllFoodItemByRestaurant);
router.put("/:id", updateFoodItem);
router.delete("/:id", deleteFoodItem);
router.get("/:id", getFoodItemById);

export default router;
