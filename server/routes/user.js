const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const { userCart, getUserCart } = require("../controllers/user");

router.get("/user/cart", authCheck, getUserCart);
router.post("/user/cart", authCheck, userCart);

module.exports = router;
