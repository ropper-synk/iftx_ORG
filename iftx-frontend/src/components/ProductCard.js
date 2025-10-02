import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/status", { withCredentials: true });
      if (res.data?.authenticated) {
        navigate(`/product/${product.id}`);
      } else {
        alert("Please login to continue.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Auth status check failed:", err);
      alert("Please login to continue.");
      navigate("/login");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="font-semibold mt-1">${product.price}</p>
      <button
        onClick={handleBuyNow}
        className="bg-blue-600 text-white px-4 py-2 mt-2 inline-block rounded hover:bg-blue-700"
      >
        Buy Now
      </button>
    </div>
  );
}

export default ProductCard;
