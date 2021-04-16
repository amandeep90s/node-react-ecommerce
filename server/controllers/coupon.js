const Coupon = require("../models/coupon");

exports.create = async (req, res) => {
    try {
        const { name, expiry, discount } = req.body;
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

exports.read = async (req, res) => {
    const coupon = await Coupon.findById(req.params.couponId).exec();

    res.json({
        coupon,
    });
};

exports.update = async (req, res) => {
    const { name, expiry, discount } = req.body;
    try {
        const updated = await Coupon.findByIdAndUpdate(
            req.params.couponId,
            { name, expiry, discount },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(400).send("Coupon updated failed");
    }
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
