const mongoose = require("mongoose");
const populate = require("mongoose-autopopulate");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true, 
  },
  comment: {
    type: String,
    required: true,
  },
});

reviewSchema.plugin(populate); 
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
