import { Router } from "express";
const router = Router();
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateCartItem,
} from "../controllers/cart.js";
import { checkAuth } from "../middlewares/auth.js";

router.post("/", checkAuth, addToCart);
router.get("/", checkAuth, getCart);
router.post("/remove/:foodItemId", checkAuth, removeFromCart);
router.post("/clear", checkAuth, clearCart);
router.post("/update", checkAuth, updateCartItem);
export default router;
