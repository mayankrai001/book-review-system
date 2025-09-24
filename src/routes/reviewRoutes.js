import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateReview, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

// Update own review (authenticated)
router.put("/:id", protect, updateReview);

// Delete own review (authenticated)
router.delete("/:id", protect, deleteReview);

export default router;
