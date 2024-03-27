const express = require("express");
const router = express.Router();

const { login, register, verifyEmail, userProfile, } = require("../controllers/UserController");
const { isAuthenticated } = require('../middlewares/Auth');

router.post("/register", register);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);
router.get('/profile', isAuthenticated, userProfile);

module.exports = router;
