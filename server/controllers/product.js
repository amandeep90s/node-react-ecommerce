const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);
        const product = await new Product(req.body).save();

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error:
                error.name === "MongoError" && error.code === 11000
                    ? "Product already exists !"
                    : "Create product failed !",
        });
    }
};

exports.listAll = async (req, res) => {
    res.json(
        await Product.find({})
            .limit(parseInt(req.params.count))
            .populate("category")
            .populate("sub_categories")
            .sort([["createdAt", "desc"]])
            .exec()
    );
};

exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("sub_categories")
        .exec();
    res.json(product);
};

exports.update = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);
        const updated = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(400).send("Product updated failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndRemove({
            slug: req.params.slug,
        }).exec();
        res.json(deleted);
    } catch (error) {
        res.status(400).send("Product delete failed");
    }
};
