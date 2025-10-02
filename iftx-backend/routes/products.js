const express = require('express');
const Product = require('../models/Product');
const { requireAdmin } = require('./admin');
const router = express.Router();

// Get all products (public route)
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 50, page = 1 } = req.query;
    
    let query = { isActive: true };
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .populate('addedBy', 'name email')
      .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      success: true,
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// Get single product (public route)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ 
      _id: req.params.id, 
      isActive: true 
    }).populate('addedBy', 'name email');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
});

// Admin: Get all products (including inactive)
router.get('/admin/all', requireAdmin, async (req, res) => {
  try {
    const { category, search, limit = 50, page = 1, status = 'all' } = req.query;
    
    let query = {};
    
    // Filter by status
    if (status !== 'all') {
      query.isActive = status === 'active';
    }
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .populate('addedBy', 'name email')
      .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      success: true,
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Admin get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// Admin: Create new product
router.post('/', requireAdmin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      stock,
      specifications,
      features
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !image) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, price, and image are required'
      });
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      image,
      category: category || 'solar',
      stock: parseInt(stock) || 0,
      specifications: specifications || {},
      features: features || [],
      addedBy: req.admin._id
    });

    await product.save();
    await product.populate('addedBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    });
  }
});

// Admin: Update product
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      stock,
      specifications,
      features,
      isActive
    } = req.body;

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update fields
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = parseFloat(price);
    if (image !== undefined) product.image = image;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = parseInt(stock);
    if (specifications !== undefined) product.specifications = specifications;
    if (features !== undefined) product.features = features;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();
    await product.populate('addedBy', 'name email');

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product'
    });
  }
});

// Admin: Delete product (soft delete)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete by setting isActive to false
    product.isActive = false;
    await product.save();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    });
  }
});

// Admin: Permanently delete product
router.delete('/:id/permanent', requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product permanently deleted'
    });

  } catch (error) {
    console.error('Permanent delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to permanently delete product'
    });
  }
});

// Admin: Restore deleted product
router.patch('/:id/restore', requireAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.isActive = true;
    await product.save();

    res.json({
      success: true,
      message: 'Product restored successfully',
      product
    });

  } catch (error) {
    console.error('Restore product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to restore product'
    });
  }
});

// Admin: Get product statistics
router.get('/admin/stats', requireAdmin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({});
    const activeProducts = await Product.countDocuments({ isActive: true });
    const inactiveProducts = await Product.countDocuments({ isActive: false });
    
    const categoryStats = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const recentProducts = await Product.find({ isActive: true })
      .populate('addedBy', 'name')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts,
        categoryStats,
        recentProducts
      }
    });

  } catch (error) {
    console.error('Product stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product statistics'
    });
  }
});

module.exports = router; 