import Review from "../models/review.js";
import Book from "../models/book.js";

// Submit a review (one per user per book, authenticated)
export const addReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.id;
    const { rating, comment } = req.body;

    if (!rating)
      return res.status(400).json({ message: "Rating (1-5) is required" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const existing = await Review.findOne({ user: userId, book: bookId });
    if (existing)
      return res
        .status(400)
        .json({ message: "You have already reviewed this book" });

    const review = await Review.create({
      user: userId,
      book: bookId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update own review
export const updateReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== userId.toString())
      return res.status(403).json({ message: "Not allowed" });

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete own review
export const deleteReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== userId.toString())
      return res.status(403).json({ message: "Not allowed" });

    await review.remove();
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
