const Coupon = require("../models/coupon");

exports.create = async (req, res) => {
    try {
        const { name, expiry, discount } = req.body.coupon;
        const coupon = await new Coupon({
            name,
            expiry,
            discount,
        }).save();

        res.json(coupon);
    } catch (error) {
        res.status(400).send("Create Coupon failed");
    }
};

exports.list = async (req, res) => {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Coupon.findByIdAndDelete(
            req.params.couponId
        ).exec();
        res.json(deleted);
    } catch (error) {
        res.status(400).send("Coupon delete failed");
    }
};
