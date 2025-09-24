import Book from "../models/book.js";
import Review from "../models/review.js";
import { getPagination } from "../utils/paginate.js";

// Creating new book (Authenticated users only)
export const createBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    if (!title || !author)
      return res.status(400).json({ message: "Title and author are required" });

    const book = await Book.create({ title, author, genre, description });
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// List all books with pagination and optional filters by author/genre
export const listBooks = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = {};
    // using Regular Expressions for case-insensitive searches
    if (req.query.author) filter.author = new RegExp(req.query.author, "i");
    if (req.query.genre) filter.genre = new RegExp(req.query.genre, "i");

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({ page, limit, total, pages: Math.ceil(total / limit), books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get book details by ID including average rating and paginated reviews
export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { page, limit, skip } = getPagination(req.query);
    const reviews = await Review.find({ book: bookId })
      .populate("user", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalReviews = await Review.countDocuments({ book: bookId });
    const ratings = await Review.find({ book: bookId }).select("rating");
    const avgRating = ratings.length
      ? ratings.reduce((s, r) => s + r.rating, 0) / ratings.length
      : null;

    res.json({
      book,
      avgRating,
      reviews,
      page,
      limit,
      totalReviews,
      pages: Math.ceil(totalReviews / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Search books by title or author (case-insensitive, partial match)
export const searchBooks = async (req, res) => {
  try {
    const q = req.query.q || req.query.query || "";
    if (!q)
      return res
        .status(400)
        .json({ message: "query parameter `q` is required" });

    const { page, limit, skip } = getPagination(req.query);
    const regex = new RegExp(q, "i");
    const filter = { $or: [{ title: regex }, { author: regex }] };

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({ page, limit, total, pages: Math.ceil(total / limit), books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
