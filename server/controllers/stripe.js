const User = require("../models/user");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Product = require("../models/product");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
    // later apply coupon
    // later calculate price

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: "inr",
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
};
