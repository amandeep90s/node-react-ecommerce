const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const {
    applyCouponToUserCart,
    emptyCart,
    userCart,
    getUserCart,
    saveAddress,
    createOrder,
} = require("../controllers/user");

// cart
router.get("/user/cart", authCheck, getUserCart);
router.post("/user/cart", authCheck, userCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

// order
router.post("/user/order", authCheck, createOrder);

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

module.exports = router;
