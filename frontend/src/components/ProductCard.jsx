import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600 mt-1">{product.description}</p>
      <p className="text-blue-500 font-bold mt-2">${product.price}</p>
      {onEdit && (
        <div className="mt-3 flex gap-2">
          <button onClick={() => onEdit(product)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
          <button onClick={() => onDelete(product._id)} className="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
