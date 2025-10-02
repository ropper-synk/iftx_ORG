import React from "react";
import ProductCard from "../components/ProductCard.js";

const products = [
  { id: 1, name: "Solar Panel A", description: "High efficiency", price: 120, image: "/assets/solar1.jpg" },
  { id: 2, name: "Solar Panel B", description: "Budget friendly", price: 90, image: "/assets/solar2.jpg" },
  { id: 3, name: "Solar Panel C", description: "Premium quality", price: 200, image: "/assets/solar3.jpg" },
];

function Home() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Home;













// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "../components/Navbar.js";
// import Footer from "../components/Footer.js";
// import Landing from "../pages/Landing.js";
// import Home from "../pages/Home.js";
// import Login from "../pages/Login.js";
// import Signup from "../pages/Signup.js";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
