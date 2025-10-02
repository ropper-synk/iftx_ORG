const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();

// Admin authentication middleware
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.session.adminId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Admin authentication required' 
      });
    }
    
    const admin = await Admin.findById(req.session.adminId);
    if (!admin || !admin.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Admin account not found or inactive' 
      });
    }
    
    req.admin = admin;
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error during admin authentication' 
    });
  }
};

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find admin
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Admin account is deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Set session
    req.session.adminId = admin._id;
    req.session.isAdmin = true;

    res.json({
      success: true,
      message: 'Admin login successful',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
        lastLogin: admin.lastLogin
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during admin login'
    });
  }
});

// Get Admin Profile
router.get('/profile', requireAdmin, async (req, res) => {
  try {
    res.json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin profile'
    });
  }
});

// Admin Logout
router.post('/logout', requireAdmin, (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Failed to logout'
        });
      }
      
      res.clearCookie('connect.sid');
      res.json({
        success: true,
        message: 'Admin logout successful'
      });
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
});

// Check Admin Auth Status
router.get('/status', async (req, res) => {
  try {
    if (!req.session.adminId) {
      return res.json({
        success: false,
        authenticated: false,
        message: 'Not authenticated'
      });
    }

    const admin = await Admin.findById(req.session.adminId);
    if (!admin || !admin.isActive) {
      return res.json({
        success: false,
        authenticated: false,
        message: 'Admin not found or inactive'
      });
    }

    res.json({
      success: true,
      authenticated: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions
      }
    });
  } catch (error) {
    console.error('Admin status check error:', error);
    res.status(500).json({
      success: false,
      authenticated: false,
      message: 'Server error'
    });
  }
});

// Create Default Admin (for initial setup)
router.post('/setup', async (req, res) => {
  try {
    // Check if any admin already exists
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin setup already completed'
      });
    }

    // Create default admin
    const defaultAdmin = new Admin({
      name: 'IFTX Admin',
      email: 'admin@iftx.com',
      password: 'admin123',
      role: 'super_admin',
      permissions: ['products:read', 'products:write', 'products:delete', 'users:read', 'users:write', 'admins:read']
    });

    await defaultAdmin.save();

    res.json({
      success: true,
      message: 'Default admin created successfully',
      admin: {
        email: defaultAdmin.email,
        note: 'Please change the password after first login'
      }
    });

  } catch (error) {
    console.error('Admin setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create default admin'
    });
  }
});

module.exports = { router, requireAdmin }; 