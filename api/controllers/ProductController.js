const Product = require("../models/product");
const ImageFile = require("../utils/ImageFile");

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

exports.createProduct = async (req, res, next) => {
  console.log(req.body)
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
