const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");

const { addToCart, getCart } = require("../controllers/cart");

router.post("/addToCart", auth, addToCart);
router.get("/getCart", auth, getCart);

module.exports = router;
