const express = require("express");
const router = express.Router();

// Middlewares
const { adminCheck, authCheck } = require("../middlewares/auth");

// Controller
const { upload, remove } = require("../controllers/cloudinary");

// Routes
router.post("/upload-images", authCheck, adminCheck, upload);
router.post("/remove-image", authCheck, adminCheck, remove);

module.exports = router;
