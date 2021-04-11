const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
    create,
    read,
    update,
    remove,
    listAll,
    list,
    productsCount,
    productStar,
    listRelated,
} = require("../controllers/product");

// product routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);
router.get("/products/:count", listAll);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.post("/products", list);

// rating system route
router.put("/product/star/:productId", authCheck, productStar);

// related products route
router.get("/product/related/:productId", listRelated);

module.exports = router;
