const express = require("express");
const router = express.Router();
const upload = require('../utils/multer');

const { getProducts, createProduct, singleProduct, updateProduct, deleteProduct } = require("../controllers/ProductController");

router.get("/get/products", getProducts);
router.post("/create/products",upload.array('images'), createProduct)
router.get("/get/single/product/:id", singleProduct)
router.put('/update/product/:id',upload.array('images'), updateProduct)
router.delete('/delete/product/:id', deleteProduct)

module.exports = router;
