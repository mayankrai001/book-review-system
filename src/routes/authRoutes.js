import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// Register new user
router.post("/signup", signup);

// Login user
router.post("/login", login);

export default router;
