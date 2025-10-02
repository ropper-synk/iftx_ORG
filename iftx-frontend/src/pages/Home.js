import React from "react";
import ProductCard from "../components/ProductCard.js";

const products = [
  { id: 1, name: "Solar Panel A", description: "High efficiency panel with advanced technology for maximum energy output", price: 120, image: "/assets/solar1.jpg" },
  { id: 2, name: "Solar Panel B", description: "Budget friendly option perfect for residential installations", price: 90, image: "/assets/solar2.jpg" },
  { id: 3, name: "Solar Panel C", description: "Premium quality panel with extended warranty and superior performance", price: 200, image: "/assets/solar3.jpg" },
];

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white pt-16 lg:pt-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Premium Solar Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-slide-up max-w-3xl mx-auto">
            Discover our range of high-quality solar panels designed to power your future sustainably
          </p>
          <div className="flex justify-center space-x-4 animate-scale-in">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-blue-100">Happy Customers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">99%</div>
              <div className="text-sm text-blue-100">Efficiency Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm text-blue-100">Years Warranty</div>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 fill-current text-blue-50">
            <path d="M0,60 C300,90 900,30 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 animate-slide-up max-w-2xl mx-auto">
            Choose from our carefully selected range of solar panels, each designed to meet different needs and budgets
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Go Solar?</h3>
              <p className="text-xl mb-6 text-blue-100">
                Join thousands of satisfied customers who have made the switch to clean energy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Get Free Quote
                </button>
                <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-300/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
