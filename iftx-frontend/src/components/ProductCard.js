import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="font-semibold mt-1">${product.price}</p>
      <Link
        to={`/product/${product.id}`}
        className="bg-blue-600 text-white px-4 py-2 mt-2 inline-block rounded hover:bg-blue-700"
      >
        View
      </Link>
    </div>
  );
}

export default ProductCard;
