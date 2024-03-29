const Brand = require("../models/brand");
const ImageFile = require("../utils/ImageFile");

exports.createBrand = async (req, res, next) => {
  try {
    req.body.images = await ImageFile.uploadMultiple({
      imageFiles: req.files,
      request: req,
    });

    const brand = await Brand.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Brand successfully created",
      brand: brand,
    });
  } catch (error) {
    console.log("error creating a brand", error);
    res.status(500).json({ message: "Brand Creation Failed" });
  }
};

exports.allBrand = async (req, res) => {
  try {
    const brand = await Brand.find();
    res.status(200).json({
      brand: brand,
    });
  } catch (err) {
    console.log(err);
    return json({ err: err });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    if (req.files?.length > 0) {
      req.body.images = await ImageFile.uploadMultiple({
        imageFiles: req.files,
        request: req,
      });
    }

    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(201)
      .json({ success: true, message: "Brand is Updated", brand: brand });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Brand Deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.status(200).json({
      brand: brand,
    });
  } catch (err) {
    console.log(err);
  }
};
