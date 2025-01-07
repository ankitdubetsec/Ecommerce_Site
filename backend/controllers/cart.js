const Cart = require("../models/cart");

const addToCart = async (req, res) => {
  const { productId, price, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            price,
            quantity,
          },
        ],
        totalPrice: price * quantity,
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, price, quantity });
      }

      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }

    // Save the cart
    await cart.save();

    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding to cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Fetch the user's cart from the database
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error fetching cart data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addToCart, getCart };
