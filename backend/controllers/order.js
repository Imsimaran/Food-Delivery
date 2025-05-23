import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Restaurant from "../models/restaurant.js";

// Create a new order
const createOrder = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "User not authenticated",
        error: true,
      });
    }

    const userId = req.user.id;
    console.log("User ID from auth:", userId);

    const {
      restaurantOrders,
      deliveryAddress,
      paymentMethod,
      paymentStatus,
      totalAmount,
    } = req.body;

    const ordersWithRestaurantNames = await Promise.all(
      restaurantOrders.map(async (order) => {
        const restaurant = await Restaurant.findById(order.restaurantId);
        return {
          ...order,
          restaurantName: restaurant ? restaurant.name : "Unknown Restaurant",
        };
      })
    );

    const order = new Order({
      userId,
      restaurantOrders: ordersWithRestaurantNames,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      paymentStatus,
    });

    console.log("Order before save:", order);

    const savedOrder = await order.save();

    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], totalPrice: 0 } }
    );

    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get all orders for a user
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Get orders by restaurant ID
const getOrderByRestaurantId = async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const orders = await Order.find({
      restaurantOrders: { $elemMatch: { restaurantId: restaurantId } },
    });
    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Update payment status for an order
const updateOrderPaymentStatus = async (req, res) => {
  const orderId = req.params.id;
  const { paymentStatus } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true }
    );
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order payment status",
      error: error.message,
    });
  }
};

// Update status of a restaurant-specific order
const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { restaurantOrderId, status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const restaurantOrder = order.restaurantOrders.find(
      (ro) => ro._id.toString() === restaurantOrderId
    );
    if (!restaurantOrder) {
      return res.status(404).json({ message: "Restaurant order not found" });
    }

    restaurantOrder.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

export {
  createOrder,
  getOrders,
  getOrderByRestaurantId,
  updateOrderPaymentStatus,
  updateOrderStatus,
};
