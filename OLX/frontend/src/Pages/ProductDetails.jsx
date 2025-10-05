import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/ProductDetails.css'

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  async function handleDelete() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in to delete a product!');
    navigate('/login');
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token }
    });

    const data = await res.json();

    if (res.ok) {
      alert('Product deleted successfully!');
      navigate('/');
    } else {
      alert(data.error || 'You are not authorized to delete this product.');
    }
  } catch (err) {
    console.error(err);
    alert('An unexpected error occurred. Please try again.');
  }
}


  return (
   <div className="product-detail-container">
      <div className="product-detail-card">
          <img className="product-detail-image" src={`http://localhost:5000${product.image_url}`} />
          <h2 className="product-detail-title">{product.title}</h2>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-info">₹{product.price}</p>
          <p className="product-detail-info">{product.category}</p>
          <p className="product-detail-info">Owner: {product.owner?.username}</p>
          
          <button className="product-detail-btn" onClick={()=>navigate(`/products/edit/${id}`)}>Edit</button>
          <button style = {{backgroundColor:'red'}}className="product-detail-btn" onClick={handleDelete}>Delete</button>
        </div>
    </div>
  );
}
