const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const {
    emptyCart,
    userCart,
    getUserCart,
    saveAddress,
} = require("../controllers/user");

router.get("/user/cart", authCheck, getUserCart);
router.post("/user/cart", authCheck, userCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

module.exports = router;
