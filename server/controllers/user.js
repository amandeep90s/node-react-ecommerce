const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");

exports.userCart = async (req, res) => {
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();

    // check if cart with logged in user id already exist
    let cartExistByThisUser = await Cart.findOne({
        orderedBy: user._id,
    }).exec();

    if (cartExistByThisUser) {
        cartExistByThisUser.remove();
    }

    for (let i = 0; i < cart.length; i++) {
        let object = {};

        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;
        // get price for creating total
        let productFromDb = await Product.findById(cart[i]._id)
            .select("price")
            .exec();
        object.price = productFromDb.price;

        products.push(object);
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy: user._id,
    }).save();

    res.json({ ok: true });
};

// get iser cart information
exports.getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();

    let cart = await Cart.findOne({ orderedBy: user._id })
        .populate("products.product", "_id title price totalAfterDiscount")
        .exec();
    const { products, cartTotal, totalAfterDiscount } = cart;

    res.json({ products, cartTotal, totalAfterDiscount });
};

// remove user cart
exports.emptyCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

    res.json(cart);
};

// save address
exports.saveAddress = async (req, res) => {
    const userAddress = await User.findOneAndUpdate(
        { email: req.user.email },
        { address: req.body.address }
    ).exec();

    res.json({ ok: true });
};

// apply coupon to cart
exports.applyCouponToUserCart = async (req, res) => {
    const { coupon } = req.body;
    const validCoupon = await Coupon.findOne({ name: coupon }).exec();

    if (validCoupon === null) {
        return res.json({
            err: "Invalid Coupon",
        });
    }

    const user = await User.findOne({ email: req.user.email }).exec();
    const cartData = await Cart.findOne({ orderedBy: user._id })
        .populate("products.product", "_id title price")
        .exec();
    if (cartData !== null) {
        let { products, cartTotal } = cartData;
        // Calculate the total after discount
        let totalAfterDiscount = (
            cartTotal -
            (cartTotal * validCoupon.discount) / 100
        ).toFixed(2);

        Cart.findOneAndUpdate(
            { orderedBy: user._id },
            { totalAfterDiscount },
            { new: true }
        ).exec();

        res.json(totalAfterDiscount);
    } else {
        res.json({
            err: "Cart is empty",
        });
    }
};
