import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <Router> {/* ✅ Only one Router in entire app */}
      <Routes>
        {/* Landing page without Navbar/Footer */}
        <Route path="/" element={<Landing />} />

        {/* All other pages with Navbar/Footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;






// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing.js";
// import Home from "./pages/Home.js";
// import Login from "./pages/Login.js";
// import Signup from "./pages/Signup.js";
// import Navbar from "./components/Navbar.js";
// import Footer from "./components/Footer.js";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route
//           path="/*"
//           element={
//             <>
//               <Navbar />
//               <Routes>
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//               </Routes>
//               <Footer />
//             </>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
















// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing.js";
// import Home from "./pages/Home.js";
// import Login from "./pages/Login.js";
// import Signup from "./pages/Signup.js";
// import Navbar from "./components/Navbar.js";
// import Footer from "./components/Footer.js";

// function App() {
//   return (
//     <Router>
//       {/* Render Navbar/Footer only for pages you want */}
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route
//           path="/*"
//           element={
//             <>
//               <Navbar />
//               <Routes>
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//               </Routes>
//               <Footer />
//             </>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;








// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar.js";
// import Footer from "./components/Footer.js";
// import Home from "./pages/Home.js";
// import Login from "./pages/Login.js";
// import Signup from "./pages/Signup.js";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
