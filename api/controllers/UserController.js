const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const ImageFile = require("../utils/ImageFile");
const ip = require("../utils/ipAddress");

// const generateSecretKey = () => {
//   const secretKey = crypto.randomBytes(32).toString("hex");

//   return secretKey;
// };

// const secretKey = generateSecretKey();

const dotenv = require("dotenv");
dotenv.config({ path: "../env" });

const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport

  const transporter = nodemailer.createTransport({
    //configure the email service
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "923f1b4fe759c5",
      pass: "bffdcf9078b243",
    },
  });

  //compose the email message
  const mailOptions = {
    from: "kickz.com",
    to: email,
    subject: "Email Verification",
  };
  if (ip.WiFi && ip.WiFi.length > 0) {
    mailOptions.text = `Please click the following link to verify your email: http://${ip.WiFi[0]}:8000/api/v1/verify/${verificationToken}`;
  } else {
    mailOptions.text = `Please click the following link to verify your email: http://${ip.Ethernet[0]}:8000/api/v1/verify/${verificationToken}`;
  }

  //send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verification email", error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if the user exists
    const user = await User.findOne({ email });
    if (user.verified === false) {
      return res.status(400).json({ message: "Check Email First" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token

    const token = jwt.sign({ userId: user._id }, "gWlkpvmeYqas79948OiH");

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login Failed" });
  }
};

exports.register = async (req, res) => {
  try {
    console.log("eupw");
    const { name, email, password } = req.body;
    //check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email was already registered" });
    }

    //create a new user
    const newUser = new User({ name, email, password });

    //genereate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    // console.log(newUser)
    await newUser.save();

    //send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(200).json({ message: "Registration Successfull" });
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Registration Failed" });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email Verified Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verification Failed" });
  }
};

exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  // console.log(user)
  res.status(200).json({
    success: true,
    user,
  });
};

exports.addAddress = async (req, res, next) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(req.user._id);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
};

exports.userAddresses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving addresses" });
  }
};

exports.userProfileUpdate = async (req, res) => {
  try {
    if (req.files?.length > 0) {
      req.body.image = await ImageFile.uploadMultiple({
        imageFiles: req.files,
        request: req,
      });
      await User.findByIdAndUpdate(
        req.user._id,
        {
          name: req.body.name,
          email: req.body.email,
          image: req.body.image[0],
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({ success: true, message: "User is Updated" });
    } else {
      await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(201).json({ success: true, message: "User is Updated" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getAllUsers = async (req, res) => {
  console.log(req.user._id);
  const user = await User.find({ _id: { $ne: req.user._id } });
  console.log(user);

  res.status(200).json({
    user,
  });
};

exports.UserInfo = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    user,
  });
};

exports.userInfoUpdate = async (req, res) => {
  try {
    if (req.files?.length > 0) {
      req.body.image = await ImageFile.uploadMultiple({
        imageFiles: req.files,
        request: req,
      });
      await User.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          email: req.body.email,
          image: req.body.image[0],
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({ success: true, message: "User is Updated" });
    } else {
      await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(201).json({ success: true, message: "User is Updated" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.DeleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "User Deleted",
  });
};
