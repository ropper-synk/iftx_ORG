const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function verifyAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/iftx', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('🔗 Connected to MongoDB');

    // Find the admin
    const admin = await Admin.findOne({ email: 'iftx_admin_sakhi@gmail.com' });
    
    if (!admin) {
      console.log('❌ Admin not found in database');
      console.log('📝 Available admins:');
      const allAdmins = await Admin.find({});
      allAdmins.forEach(a => {
        console.log(`  - ${a.email} (${a.role}) - Active: ${a.isActive}`);
      });
      return;
    }

    console.log('✅ Admin found in database:');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('👑 Role:', admin.role);
    console.log('🟢 Active:', admin.isActive);
    console.log('📅 Created:', admin.createdAt);
    console.log('🔑 Password Hash Length:', admin.password?.length || 'No password');

    // Test password comparison
    console.log('\n🔐 Testing password comparison...');
    const testPassword = 'Iftx@Sakhi@127001';
    const isValid = await admin.comparePassword(testPassword);
    console.log(`🧪 Password "${testPassword}" is valid:`, isValid);

    // Test wrong password
    const wrongPassword = 'wrongpassword';
    const isWrongValid = await admin.comparePassword(wrongPassword);
    console.log(`🧪 Wrong password "${wrongPassword}" is valid:`, isWrongValid);
    
  } catch (error) {
    console.error('❌ Error verifying admin:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

verifyAdmin(); 