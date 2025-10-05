const Product = require('../models/Product');

// Get all products on homepage
exports.getProducts = async(req, res) => {
  const products = await Product.find().populate('owner', 'username email');
  res.json(products);
};

// Create a Product
exports.createProduct = async(req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image_url = req.file ? '/uploads/' + req.file.filename : '/uploads/default.jpg';

    const product = new Product({ 
      title,
      description, 
      price, 
      category, 
      image_url, 
      owner: req.user.id  
    });
    await product.save();

    res.status(201).json({ message: 'Product created', product });
  } 
  catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get Product Details
exports.getProductDetails = async(req, res) => {
  const product = await Product.findById(req.params.id).populate('owner', 'username email');
  if (!product) return res.status(404).send('Not found');
  res.json(product);
};

// Update Product Details
exports.updateProduct = async(req, res) => {
  
  try {
        const product = await Product.findById(req.params.id);

        if (!product) 
            return res.status(404).json({ error: 'Not found' });
        if (product.owner.toString() !== req.user.id) 
            return res.status(403).json({ error: 'Not your product' });

        // Update other fields from req.body
        Object.assign(product, req.body);

        // If new image is uploaded, update image_url path
        if (req.file) 
          product.image_url = '/uploads/' + req.file.filename;

        await product.save();
        res.json({ message: 'Product updated', product });
  } 
  catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) 
    return res.status(404).send('Not found');
  if (product.owner.toString() !== req.user.id) 
    return res.status(403).send('Not your product');

  await product.deleteOne();
  res.json({ success: true });
};
