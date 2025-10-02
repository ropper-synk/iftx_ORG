const mongoose = require('mongoose');
const Product = require('./models/Product');
const Admin = require('./models/Admin');
require('dotenv').config();

async function setupProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/iftx', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');

    // Find the admin to associate products with
    const admin = await Admin.findOne({ email: 'admin@iftx.com' });
    if (!admin) {
      console.log('❌ Admin not found. Please run setup-admin.js first');
      process.exit(1);
    }

    // Check if products already exist
    const existingProducts = await Product.find({});
    if (existingProducts.length > 0) {
      console.log('Products already exist in database');
      process.exit(0);
    }

    // Sample products data
    const sampleProducts = [
      {
        name: "Solar Panel Pro 400W",
        description: "High efficiency monocrystalline solar panel with advanced PERC technology for maximum energy output and durability",
        price: 299.99,
        image: "/assets/solar1.jpg",
        category: "solar",
        stock: 50,
        specifications: {
          power: "400W",
          voltage: "24V",
          efficiency: "22.1%",
          warranty: "25 years",
          dimensions: "2008×1002×35mm",
          weight: "22.5kg"
        },
        features: [
          "High efficiency monocrystalline cells",
          "PERC technology for enhanced performance",
          "Anti-reflective glass coating",
          "Corrosion resistant aluminum frame",
          "IP67 rated junction box"
        ],
        addedBy: admin._id
      },
      {
        name: "Solar Panel Eco 300W",
        description: "Budget-friendly polycrystalline solar panel perfect for residential installations with reliable performance",
        price: 199.99,
        image: "/assets/solar2.jpg",
        category: "solar",
        stock: 75,
        specifications: {
          power: "300W",
          voltage: "24V",
          efficiency: "18.5%",
          warranty: "20 years",
          dimensions: "1956×992×40mm",
          weight: "20kg"
        },
        features: [
          "Polycrystalline silicon cells",
          "Excellent price-performance ratio",
          "Weather resistant design",
          "Easy installation",
          "TUV and CE certified"
        ],
        addedBy: admin._id
      },
      {
        name: "Solar Panel Ultra 500W",
        description: "Premium bifacial solar panel with cutting-edge technology and superior performance for commercial applications",
        price: 449.99,
        image: "/assets/solar3.jpg",
        category: "solar",
        stock: 25,
        specifications: {
          power: "500W",
          voltage: "48V",
          efficiency: "21.8%",
          warranty: "30 years",
          dimensions: "2172×1303×35mm",
          weight: "28kg"
        },
        features: [
          "Bifacial monocrystalline design",
          "Up to 30% additional power from rear side",
          "Half-cut cell technology",
          "Lower temperature coefficient",
          "Enhanced low-light performance"
        ],
        addedBy: admin._id
      },
      {
        name: "Lithium Battery Pack 10kWh",
        description: "High-capacity lithium iron phosphate battery system for residential energy storage with smart BMS",
        price: 3999.99,
        image: "/assets/battery1.jpg",
        category: "battery",
        stock: 15,
        specifications: {
          power: "10kWh",
          voltage: "48V",
          efficiency: "95%",
          warranty: "10 years",
          dimensions: "600×400×200mm",
          weight: "85kg"
        },
        features: [
          "LiFePO4 chemistry for safety",
          "Built-in Battery Management System",
          "6000+ cycle life",
          "Wide operating temperature range",
          "Modular expandable design"
        ],
        addedBy: admin._id
      },
      {
        name: "Pure Sine Wave Inverter 5000W",
        description: "High-efficiency pure sine wave inverter with MPPT charge controller for off-grid solar systems",
        price: 899.99,
        image: "/assets/inverter1.jpg",
        category: "inverter",
        stock: 30,
        specifications: {
          power: "5000W",
          voltage: "48V",
          efficiency: "93%",
          warranty: "5 years",
          dimensions: "485×275×155mm",
          weight: "12kg"
        },
        features: [
          "Pure sine wave output",
          "Built-in MPPT solar controller",
          "LCD display with monitoring",
          "Multiple protection functions",
          "Remote monitoring capability"
        ],
        addedBy: admin._id
      }
    ];

    // Create products
    const createdProducts = await Product.insertMany(sampleProducts);
    
    console.log(`✅ ${createdProducts.length} sample products created successfully!`);
    console.log('📦 Products added:');
    createdProducts.forEach(product => {
      console.log(`  - ${product.name} ($${product.price})`);
    });
    
  } catch (error) {
    console.error('❌ Error setting up products:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

setupProducts(); 