import express, { json, urlencoded } from "express";
const server = express();
import userRouter from "./routes/user.js";
import restaurantRouter from "./routes/restaurant.js";
import foodRouter from "./routes/foodItem.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/orders.js";
import { mongoDBConnection } from "./connection/connect.js";
const port = process.env.PORT || 3030;
import { checkAuth } from "./middlewares/auth.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

mongoDBConnection("foodDelivery");

server.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://food-delivery-lac-five.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: true,
    optionsSuccessStatus: 200,
  })
);

server.use(json());
server.use(cookieParser());
server.use(urlencoded({ extended: true }));
server.use(urlencoded({ extended: true }));
server.use(cors());
server.use("/user", userRouter);
server.use("/restaurant", restaurantRouter);
server.use("/food", foodRouter);
server.use(checkAuth);

server.use("/cart", cartRouter);
server.use("/order", orderRouter);
server.get("/", (req, res) => {
  res.send("Welcome to BeFoodie");
});

console.log("checkAuth:", checkAuth);

server.listen(port, () => {
  console.log("server is running on " + port);
});
