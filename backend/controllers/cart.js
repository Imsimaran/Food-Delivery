import Cart from "../models/cart.js";
import FoodItem from "../models/foodItem.js";

// Add to Cart
export async function addToCart(req, res) {
  try {
    const { foodItem: foodItemId, quantity } = req.body;
    const userId = req.user.id;

    const foodItemDetails = await FoodItem.findById(foodItemId);
    if (!foodItemDetails) {
      return res.status(404).json({ message: "Food item not found" });
    }

    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      userCart = new Cart({
        user: userId,
        items: [],
        totalPrice: 0,
      });
    }

    const existingItemIndex = userCart.items.findIndex(
      (item) => item.foodItem.toString() === foodItemId
    );

    if (existingItemIndex !== -1) {
      userCart.items[existingItemIndex].quantity += quantity;
    } else {
      userCart.items.push({ foodItem: foodItemId, quantity });
    }

    userCart.totalPrice = userCart.items.reduce((total, item) => {
      return total + foodItemDetails.price * item.quantity;
    }, 0);

    await userCart.save();

    const populatedCart = await Cart.findById(userCart._id).populate(
      "items.foodItem"
    );

    res.status(200).json({
      message: "Item added to cart successfully",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding item to cart",
      error: error.message,
    });
  }
}

// Get Cart
export async function getCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.foodItem",
      model: "FoodItem",
      select:
        "_id name price description category imageUrl availability ratings restaurant isVeg",
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart",
      error: error.message,
    });
  }
}

// Remove Item from Cart
export async function removeFromCart(req, res) {
  const { foodItemId } = req.params;

  try {
    const userId = req.user.id;
    const userCart = await Cart.findOne({ user: userId }).populate(
      "items.foodItem"
    );

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = userCart.items.findIndex(
      (item) => item.foodItem._id.toString() === foodItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    userCart.items.splice(itemIndex, 1);

    userCart.totalPrice = userCart.items.reduce((total, item) => {
      return total + (item.foodItem?.price || 0) * item.quantity;
    }, 0);

    await userCart.save();

    const updatedCart = await Cart.findById(userCart._id).populate(
      "items.foodItem"
    );

    res.status(200).json({
      message: "Item removed from cart",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing item from cart",
      error: error.message,
    });
  }
}

// Clear Cart
export async function clearCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({
      message: "Error clearing cart",
      error: error.message,
    });
  }
}

// Update Cart Item (increment/decrement)
export async function updateCartItem(req, res) {
  const { foodItemId, increment } = req.body;
  const userId = req.user.id;

  try {
    const userCart = await Cart.findOne({ user: userId }).populate(
      "items.foodItem"
    );
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = userCart.items.findIndex(
      (item) => item.foodItem._id.toString() === foodItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (increment) {
      userCart.items[itemIndex].quantity += 1;
    } else {
      userCart.items[itemIndex].quantity -= 1;
      if (userCart.items[itemIndex].quantity <= 0) {
        userCart.items.splice(itemIndex, 1);
      }
    }

    userCart.totalPrice = userCart.items.reduce(
      (total, item) => total + item.foodItem.price * item.quantity,
      0
    );

    await userCart.save();

    const updatedCart = await Cart.findById(userCart._id).populate(
      "items.foodItem"
    );

    res.status(200).json({
      message: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating cart",
      error: error.message,
    });
  }
}
