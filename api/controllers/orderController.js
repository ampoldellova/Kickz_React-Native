const User = require("../models/user");
const Order = require("../models/order");

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
        await User.findByIdAndUpdate(req.user._id, { orders: order._id }, { new: true })

        res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
        console.log("error creating orders", error);
        res.status(500).json({ message: "Error creating orders" });
    }
};