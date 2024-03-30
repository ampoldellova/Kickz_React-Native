const express = require("express");
const router = express.Router();
const upload = require('../utils/multer');
const { login, register, verifyEmail, userProfile, addAddress, userAddresses, userProfileUpdate } = require("../controllers/UserController");
const { isAuthenticated } = require('../middlewares/Auth');

router.post("/register", register);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);
router.get('/profile', isAuthenticated, userProfile);
router.post('/address/create', isAuthenticated, addAddress)
router.get('/addresses/:id', isAuthenticated, userAddresses)
router.put("/update/user/profile", isAuthenticated, upload.array('image'), userProfileUpdate)

module.exports = router;
