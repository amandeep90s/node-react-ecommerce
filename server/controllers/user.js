const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const uniqueid = require("uniqueid");

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

    res.json({
        products: cart.products,
        cartTotal: cart.cartTotal,
        totalAfterDiscount: cart.totalAfterDiscount,
    });
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

// create order
exports.createOrder = async (req, res) => {
    const { paymentIntent } = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email }).exec();

    let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

    let newOrder = await new Order({
        products,
        paymentIntent,
        orderedBy: user._id,
    }).save();

    // decrement quantity, increment sold
    let bulkOption = products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } },
            },
        };
    });
    // bulk update
    let updated = await Product.bulkWrite(bulkOption, {});

    res.json({ ok: true });
};

// create cod order
exports.createCashOrder = async (req, res) => {
    const { cod } = req.body;
    // if cod is true, create order with status of cash on delivery
    if (!cod) {
        return res.status(400).send("Create cash order fail");
    }

    const user = await User.findOne({ email: req.user.email }).exec();

    let userCart = await Cart.findOne({ orderedBy: user._id }).exec();

    let newOrder = await new Order({
        products: userCart.products,
        paymentIntent: {
            id: uniqueid(),
            amount: userCart.cartTotal,
            currency: "INR",
            status: "Cash On Delivery",
            created: Date.now(),
            payment_method_types: ["cash"],
        },
        orderStatus: "Cash On Delivery",
        orderedBy: user._id,
    }).save();

    // decrement quantity, increment sold
    let bulkOption = userCart.products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } },
            },
        };
    });
    // bulk update
    let updated = await Product.bulkWrite(bulkOption, {});

    res.json({ ok: true });
};

// list user orders
exports.listOrders = async (req, res) => {
    let user = await User.findOne({ email: req.user.email }).exec();

    let orders = await Order.find({ orderedBy: user._id })
        .populate("products.product")
        .exec();

    res.json(orders);
};

// add to wishlist
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;

    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { $addToSet: { wishlist: productId } }
    ).exec();

    res.json({ ok: true });
};

// get all user wishlist
exports.getWishlists = async (req, res) => {
    const list = await User.findOne({ email: req.user.email })
        .select("wishlist")
        .populate("wishlist")
        .exec();

    res.json(list);
};

// remove user wishlist
exports.removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { $pull: { wishlist: productId } }
    ).exec();

    res.json({ ok: true });
};
