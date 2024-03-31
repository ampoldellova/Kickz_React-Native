const express = require("express");
const router = express.Router();
const upload = require('../utils/multer');

const { placeOrder } = require("../controllers/orderController");
const { isAuthenticated } = require('../middlewares/Auth');

router.post("/order", isAuthenticated, placeOrder);

module.exports = router;