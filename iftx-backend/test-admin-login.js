const axios = require('axios');

async function testAdminLogin() {
  try {
    console.log('🧪 Testing Admin Login API...');
    
    const loginData = {
      email: 'iftx_admin_sakhi@gmail.com',
      password: 'Iftx@Sakhi@127001'
    };
    
    console.log('📤 Sending login request with:', {
      email: loginData.email,
      password: '***hidden***'
    });
    
    const response = await axios.post('http://localhost:5000/api/admin/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    console.log('✅ Login successful!');
    console.log('📋 Response status:', response.status);
    console.log('📋 Response data:', response.data);
    
  } catch (error) {
    console.log('❌ Login failed!');
    
    if (error.response) {
      console.log('📋 Error status:', error.response.status);
      console.log('📋 Error data:', error.response.data);
    } else if (error.request) {
      console.log('📋 No response received:', error.message);
      console.log('🔍 Possible causes:');
      console.log('  - Backend server is not running');
      console.log('  - Wrong port (should be 5000)');
      console.log('  - Network connectivity issues');
    } else {
      console.log('📋 Request setup error:', error.message);
    }
  }
}

testAdminLogin(); 