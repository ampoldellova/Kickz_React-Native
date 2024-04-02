const Product = require("../models/product");
const Brand = require("../models/brand");
const Order = require("../models/order");
const Review = require("../models/review");
const ImageFile = require("../utils/ImageFile");

async function calculateAverageRating(reviews) {
  const totalRatings = reviews.length;
  const sumRatings = reviews.reduce((acc, review) => acc + review.ratings, 0);
  const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
  return averageRating;
}

exports.getProducts = async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json({
      product: product,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.reviewsOfProduct = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const reviews = await Review.find({
      product: req.params.id,
    });

    const rating = await calculateAverageRating(reviews);

    return res.status(200).json({
      success: true,
      reviews: reviews,
      rating: rating,
      totalReviews: reviews.length,
    });
    console.log(reviews);
  } catch (err) {
    console.log(err);
  }
};

exports.createProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    req.body.images = await ImageFile.uploadMultiple({
      imageFiles: req.files,
      request: req,
    });

    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Brand successfully created",
      product: product,
    });
  } catch (error) {
    console.log("error creating a product", error);
    res.status(500).json({ message: "Product Creation Failed" });
  }
};

exports.singleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(product);
  res.status(200).json({ product });
};

exports.updateProduct = async (req, res) => {
  console.log(req.body);
  try {
    if (req.files?.length > 0) {
      req.body.images = await ImageFile.uploadMultiple({
        imageFiles: req.files,
        request: req,
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(201)
      .json({ success: true, message: "Product is Updated", product: product });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Producted Delete",
  });
};

exports.AddReview = async (req, res) => {
  try {
    req.body.user = req.user._id;
    req.body.product = req.params.id;
    const review = await Review.create(req.body);
    const product = await Product.findById(req.params.id);

    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $push: { reviews: review._id },
      },
      { new: true }
    );

    res.status(200).json({ review });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.EditReview = async (req, res) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Review Deleted" });
};
