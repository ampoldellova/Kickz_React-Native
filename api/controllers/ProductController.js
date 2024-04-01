const Product = require("../models/product");
const Brand = require("../models/brand");
const Review = require("../models/review");
const ImageFile = require("../utils/ImageFile");

exports.getProducts = async (req, res) => {
  try {
    const product = await Product.find().populate({
      path: "brand",
      model: Brand,
    });

    res.status(200).json({
      product: product,
    });
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
    console.log(req.body)
    req.body.user = req.user._id;
    const review = await Review.create(req.body);
    res.status(200).json({ review });
  } catch (err) {
    console.log(err);
  }
};
