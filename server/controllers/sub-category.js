const SubCategory = require("../models/sub-category");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const subCategory = await new SubCategory({
            name,
            slug: slugify(name),
            parent,
        }).save();

        res.json(subCategory);
    } catch (error) {
        res.status(400).send("Create Sub Category failed");
    }
};

exports.list = async (req, res) => {
    res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
    const subCategory = await SubCategory.findOne({
        slug: req.params.slug,
    }).exec();

    const products = await Product.find({ sub_categories: subCategory._id })
        .populate("category")
        .exec();

    res.json({
        subCategory,
        products,
    });
};

exports.update = async (req, res) => {
    const { name, parent } = req.body;
    try {
        const updated = await SubCategory.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name), parent },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(400).send("Sub Category updated failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await SubCategory.findOneAndDelete({
            slug: req.params.slug,
        });
        res.json(deleted);
    } catch (error) {
        res.status(400).send("Sub Category delete failed");
    }
};
