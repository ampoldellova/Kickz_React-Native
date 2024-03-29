const express = require("express");
const router = express.Router();
const upload = require('../utils/multer');
const { getProducts, createProduct } = require("../controllers/ProductController");

router.get("/get/products", getProducts);
router.post("/create/products",upload.array('images'), createProduct)

module.exports = router;
