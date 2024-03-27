const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const ip = require("../utils/ipAddress");

// const generateSecretKey = () => {
//   const secretKey = crypto.randomBytes(32).toString("hex");

//   return secretKey;
// };

// const secretKey = generateSecretKey();

const dotenv = require('dotenv');
dotenv.config({path: '../env'})

const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport

  const transporter = nodemailer.createTransport({
    //configure the email service
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2f4427edf0c7d5",
      pass: "0342a4773b0930"
    }
  });

  //compose the email message
  const mailOptions = {
    from: "kickz.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://${ip.WiFi[0]}:8000/api/v1/verify/${verificationToken}`,
  };

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
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token

    const token = jwt.sign({ userId: user._id }, 'gWlkpvmeYqas79948OiH');

    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
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
    user
  })
}