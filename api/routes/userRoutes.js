const express = require("express");
const router = express.Router();

const { login, register, verifyEmail } = require("../controllers/UserController");

router.post("/register", register);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);

module.exports = router;
