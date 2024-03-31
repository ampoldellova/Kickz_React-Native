const express = require("express");
const router = express.Router();
const upload = require('../utils/multer');
const { login, register, verifyEmail, userProfile, addAddress, userAddresses, userProfileUpdate, getAllUsers, UserInfo, userInfoUpdate, DeleteUser } = require("../controllers/UserController");
const { isAuthenticated } = require('../middlewares/Auth');

router.post("/register", register);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);
router.get('/profile', isAuthenticated, userProfile);
router.post('/address/create', isAuthenticated, addAddress)
router.get('/addresses/:id', isAuthenticated, userAddresses)
router.put("/update/user/profile", isAuthenticated, upload.array('image'), userProfileUpdate)
router.put("/update/user/info/:id", isAuthenticated, upload.array('image'), userInfoUpdate)
router.get("/all/users", isAuthenticated, getAllUsers)
router.get("/userInfo/:id", UserInfo)
router.delete("/delete/user/:id", DeleteUser)

module.exports = router;
