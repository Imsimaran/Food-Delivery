import mongoose from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      // required:true,
    },
    phone: {
      type: String,
      // required:true,
    },
    role: {
      type: String,
      default: "customer",
      enum: ["customer", "admin", "superadmin"],
    },
  },

  { timestamps: true }
);

const user = model("User", userSchema);
export default user;
