const express = require("express");
const router = express.Router();

const { login, register, verifyEmail, userProfile, addAddress, userAddresses, } = require("../controllers/UserController");
const { isAuthenticated } = require('../middlewares/Auth');

router.post("/register", register);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);
router.get('/profile', isAuthenticated, userProfile);
router.post('/address/create', isAuthenticated, addAddress)
router.get('/addresses/:id', isAuthenticated, userAddresses)

module.exports = router;
