import Product from "../models/Product.js";

// ----------- Add new Product in MongoDB ---------------
export const createProduct = async (req, res) => {
  const { name, price, description, stock } = req.body;

  try {
    const newProduct = new Product({ name, price, description, stock });
    await newProduct.save();

    res.status(201).json(`${name} added in Products list Database`, newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

// -------------- GET all products ----------------
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // fetch all products from MongoDB
    res.status(200).json(products); // send all products as json response
  } catch (error) {
    res.status(500).json({ message: "failed to fetch products" }); // error handling
  }
};

// ------------- GET Single product by ID ------------------
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id; // GET product ID from route
    const product = await Product.findById(productId) // get product by ID

    if(!product) return res.status(404).json({ message: "Product not found"}); // If product not found

    res.status(200).json(product); // If found, return product in json response

  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// ----------------------Update Product-----------------------------------------------

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, description, stock } = req.body;

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, stock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// --------- Delete Product by ID ----------
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};