import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import dotenv from "dotenv";
dotenv.config();

export function generationToken(userData) {
  return sign(
    {
      _id: userData._id,
      username: userData.username,
      email: userData.email,
      role: userData.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(token) {
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
