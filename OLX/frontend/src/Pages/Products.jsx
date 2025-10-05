import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router';
import '../css/Products.css';

export default function Products({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredProducts.length === 0)
    return <p className="no-products">No products found.</p>;

  return (
    <div className="products-container">
      {filteredProducts.map(p => (
        <ProductCard
          key={p._id}
          product={p}
          onClick={() => navigate(`/products/${p._id}`)}
        />
      ))}
    </div>
  );
}

