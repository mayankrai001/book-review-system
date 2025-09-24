import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

// Prevent duplicate review by same user on same book on the DB level
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
