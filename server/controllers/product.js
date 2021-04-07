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

exports.list = async (req, res) => {
    try {
        const { sort, order, page } = req.body;
        const currentPage = page || 1;
        const perPage = 4;

        const products = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate("category")
            .populate("sub_categories")
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(products);
    } catch (error) {
        console.error(error);
    }
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
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updated = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();
        res.json(updated);
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

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();

    res.json(total);
};
