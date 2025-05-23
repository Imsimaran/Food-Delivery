import { Router } from "express";
const router = Router();

import { signup, login, getUserDetails } from "../controllers/user.js";

router.post("/", signup);
router.post("/login", login);
router.get("/:username", getUserDetails);

export default router;
