import React from 'react';
import '../css/ProductCard.css';

export default function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={`http://localhost:5000${product.image_url}`} />
      <h3>{product.title}  ({product.category})</h3>
      <p>₹{product.price}</p>
    </div>
  );
}
 