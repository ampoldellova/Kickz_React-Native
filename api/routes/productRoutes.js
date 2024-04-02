const express = require("express");
const router = express.Router();
const upload = require('../utils/multer');

const { getProducts, createProduct, singleProduct, updateProduct, deleteProduct, AddReview } = require("../controllers/ProductController");
const { isAuthenticated } = require("../middlewares/Auth");

router.get("/get/products", getProducts);
router.post("/create/products",upload.array('images'), createProduct)
router.get("/get/single/product/:id", singleProduct)
router.put('/update/product/:id',upload.array('images'), updateProduct)
router.delete('/delete/product/:id', deleteProduct)

router.post("/create/review/:id", isAuthenticated, AddReview)

module.exports = router;
