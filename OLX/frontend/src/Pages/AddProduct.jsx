import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../css/AddProduct.css';

export default function AddProduct() {
  const navigate = useNavigate();

  // State for form data
  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
  });
  // State for Image of Product
  const [file, setFile] = useState(null);
  // Form data is changed
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Image File is changed
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Submit form action
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('category', form.category);
    if (file) 
      formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        body: formData,
      });

      if (res.ok) {
        alert('Product added successfully!');
        navigate('/');
      } else {
        const err = await res.json();
        alert('Error: ' + err.message);
      }
    } catch (err) {
        alert('Login to start Adding');
        navigate('/login');
    }
  }

  return (
    <div className="add-product-container">
      <div className="add-product-box">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input 
            type="text" 
            name="title" 
            placeholder="Product Title" 
            value={form.title} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="category" 
            placeholder="Category" 
            value={form.category} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="number" 
            name="price" 
            placeholder="Price (₹)" 
            value={form.price} 
            onChange={handleChange} 
            required 
          />
          <textarea 
            name="description" 
            placeholder="Description" 
            value={form.description} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}
