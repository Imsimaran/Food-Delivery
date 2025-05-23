import { Router } from "express";
const router = Router();
import {
  createOrder,
  getOrders,
  getOrderByRestaurantId,
  updateOrderPaymentStatus,
  updateOrderStatus,
} from "../controllers/order.js";

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderByRestaurantId);
router.put("/:id/pstatus", updateOrderPaymentStatus);
router.put(
  "/order/:orderId/restaurant/:restaurantOrderId/status",
  updateOrderStatus
);

export default router;
