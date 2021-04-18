const express = require("express");
const router = express.Router();
const { route } = require("./user");

// middleware
const { authCheck } = require("../middlewares/auth");
// controller
const { createPaymentIntent } = require("../controllers/stripe");

router.post("/create-payment-intent", authCheck, createPaymentIntent);

module.exports = router;
