import mongoose from "mongoose";
const { Schema, model } = mongoose;

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    openingHours: {
      type: Map,
      of: String, // e.g., { Monday: "9am-9pm", Tuesday: "Closed" }
    },
    deliveryTime: {
      type: String,
      required: true,
    },
    cuisine: {
      type: [String],
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      get: (v) => Math.round(v * 10) / 10,
      set: (v) => Math.round(v * 10) / 10,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isVegOnly: {
      type: Boolean,
      default: false,
    },
    menu: [
      {
        type: Schema.Types.ObjectId,
        ref: "FoodItem",
      },
    ],
    image: {
      type: String, // URL or file path
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

export default model("Restaurant", restaurantSchema);
