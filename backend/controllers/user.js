import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generationToken } from "../connection/auth.js";

export async function signup(req, res) {
  try {
    const { fullname, username, email, password, address, phone, role } =
      req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).send({
        status: "error",
        message: "User with this email or username already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      address,
      phone,
      role,
    });

    const token = generationToken(newUser);

    res.status(201).send({
      status: "success",
      message: "User signed up successfully",
      token,
      userId: newUser._id,
      role: newUser.role,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "User creation failed",
      error: err.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = generationToken(user);
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true in production with HTTPS
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        expires,
      })
      .send({
        token,
        username: user.username,
        userId: user._id,
        role: user.role,
        status: "success",
        message: "User logged in successfully",
      });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: "Login failed",
      error: err.message,
    });
  }
}

export async function getUserDetails(req, res) {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password"); // exclude password
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}
