const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const { placeOrder, getAllOrder, UpdateStatus, getSingleOrderUser } = require("../controllers/orderController");
const { isAuthenticated } = require("../middlewares/Auth");

router.post("/order", isAuthenticated, placeOrder);
router.get("/all/orders", getAllOrder);
router.put("/update/status", UpdateStatus)
router.get("/get/single/order", isAuthenticated, getSingleOrderUser)

module.exports = router;
