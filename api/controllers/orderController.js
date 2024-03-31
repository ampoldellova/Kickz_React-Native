const User = require("../models/user");
const Order = require("../models/order");
const nodemailer = require("nodemailer");

const sendOrderNotification = async (email, products, order) => {
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
        from: 'kickz@gmail.com',
        to: email,
        subject: "Order Notification",
    };
    const productText = products.map(product => `- ${product.name} x${product.quantity}`).join('\n');

    mailOptions.text = `Thank you for ordering from kickz! \n\nThis is the list of items you've ordered:\n${productText}\n\nPayment Method: ${order.paymentMethod}\nOrder Total:₱ ${order.totalPrice}`;

    //send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending verification email", error);
    }
};

exports.placeOrder = async (req, res, next) => {
    try {
        const { cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //create an array of product objects from the cart Items
        const products = cartItems.map((item) => ({
            name: item?.name,
            quantity: item.quantity,
            price: item.price,
            image: item?.images[0],
        }));

        //create a new Order
        const order = new Order({
            user: req.user._id,
            products: products,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
        });

        await order.save();
        await User.findByIdAndUpdate(req.user._id, { $push: { orders: order._id } }, { new: true })
        sendOrderNotification(req.user.email, products, order)

        res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
        console.log("error creating orders", error);
        res.status(500).json({ message: "Error creating orders" });
    }
};