const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function setupAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/iftx', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Check if any admin already exists
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      process.exit(0);
    }

    // Create default admin
    const defaultAdmin = new Admin({
      name: 'IFTX Admin',
      email: 'admin@iftx.com',
      password: 'admin123',
      role: 'super_admin',
      permissions: [
        'products:read', 
        'products:write', 
        'products:delete', 
        'users:read', 
        'users:write', 
        'admins:read'
      ]
    });

    await defaultAdmin.save();
    
    console.log('✅ Default admin created successfully!');
    console.log('📧 Email: admin@iftx.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  Please change the password after first login');
    
  } catch (error) {
    console.error('❌ Error setting up admin:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

setupAdmin(); 