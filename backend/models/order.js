import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantOrders: [
      {
        restaurantId: {
          type: Schema.Types.ObjectId,
          ref: "Restaurant",
          required: true,
        },
        restaurantName: {
          type: String,
          required: true,
        },
        items: [
          {
            foodItem: {
              type: Schema.Types.ObjectId,
              ref: "FoodItem",
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
          },
        ],
        subtotal: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: [
            "pending",
            "confirmed",
            "preparing",
            "out_for_delivery",
            "delivered",
            "cancelled",
          ],
          default: "pending",
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "card", "upi", "netbanking"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1, orderDate: -1 });

orderSchema.pre("save", function (next) {
  this.totalAmount = this.restaurantOrders.reduce(
    (total, order) => total + order.subtotal,
    0
  );
  next();
});

export default model("Order", orderSchema);
