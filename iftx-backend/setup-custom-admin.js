const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function setupCustomAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/iftx', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Check if this specific admin already exists
    const existingAdmin = await Admin.findOne({ email: 'iftx_admin_sakhi@gmail.com' });
    if (existingAdmin) {
      console.log('✅ Admin already exists:', existingAdmin.email);
      console.log('📧 Email:', existingAdmin.email);
      console.log('👑 Role:', existingAdmin.role);
      process.exit(0);
    }

    // Create the specific admin user
    const customAdmin = new Admin({
      name: 'IFTX Admin Sakhi',
      email: 'iftx_admin_sakhi@gmail.com',
      password: 'Iftx@Sakhi@127001',
      role: 'super_admin',
      permissions: [
        'products:read', 
        'products:write', 
        'products:delete', 
        'users:read', 
        'users:write', 
        'admins:read',
        'admins:write'
      ]
    });

    await customAdmin.save();
    
    console.log('✅ Custom admin created successfully!');
    console.log('📧 Email: iftx_admin_sakhi@gmail.com');
    console.log('🔑 Password: Iftx@Sakhi@127001');
    console.log('👑 Role: super_admin');
    console.log('🎯 Admin can now login to manage products');
    
  } catch (error) {
    console.error('❌ Error setting up custom admin:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

setupCustomAdmin(); 