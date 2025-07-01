import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ------------ ADD Item to Cart -------------------
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId; // GET user ID from token (middleware)
    const { productId, quantity } = req.body;

    // check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find user's cart or create new one if not exist
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    } else if (!cart.items) {
      cart.items = [];
    }

    // check if product is already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    console.log(cart)

    if(itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity; // increase quantity
    } else {
        cart.items.push({ productId, quantity}); // add new item
    }

    await cart.save(); // save in MongoDB
    res.status(200).json({ message: 'item added to cart', cart});

  } catch (error) {
    console.error("🔥 Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------ UPDATE Item Quantity------------------------
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if(!cart) return res.status(404).json({ message: 'Cart not found'});

        const item = cart.items.find(item => item.productId.toString() === productId );
        if(!item) return res.status(404).json({ message: 'Item not found in cart'});

        item.quantity = quantity; // update quantity
        await cart.save();

        res.status(200).json({ message: 'Cart updated', cart});
        
    } catch (error) {
        res.status(500).json({ message: 'Server error'})
    }
};

// ----------------- REMOVE Item from Cart --------------
export const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;
        
        const cart = await Cart.findOne({ userId});
        if(!cart) return res.status(404).json({ message: 'Cart not found'});

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );
        await cart.save();
        
        res.status(200).json({ message: 'Item removed', cart});

    } catch (error) {
        res.status(500).json({ message: 'Server error'})
    }
};