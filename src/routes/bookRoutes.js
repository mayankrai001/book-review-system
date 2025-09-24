import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBook,
  listBooks,
  getBookById,
  searchBooks,
} from "../controllers/bookController.js";
import { addReview } from "../controllers/reviewController.js";

const router = express.Router();

// Create a book (authenticated - used middleware to authenticate)
router.post("/createBook", protect, createBook);

// List all books with optional filters and pagination
router.get("/getBooks", listBooks);

// Search books by title or author
router.get("/search", searchBooks);

// Get book details by ID including reviews and average rating
router.get("/:id", getBookById);

// Submit a review for a book (authenticated)
router.post("/:id/reviews", protect, addReview);

export default router;
