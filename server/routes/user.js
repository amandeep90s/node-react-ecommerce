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
    createCashOrder,
    createOrder,
    listOrders,
    addToWishlist,
    getWishlists,
    removeFromWishlist,
} = require("../controllers/user");

// cart
router.get("/user/cart", authCheck, getUserCart);
router.post("/user/cart", authCheck, userCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

// order
router.post("/user/order", authCheck, createOrder); //stripe
router.post("/user/cash-order", authCheck, createCashOrder); //cod
router.get("/user/orders", authCheck, listOrders);

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, getWishlists);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

module.exports = router;
