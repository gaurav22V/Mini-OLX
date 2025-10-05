import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/AddProduct.css';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });

  const [file, setFile] = useState(null);

  // Fetch existing product details on mount
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          title: data.title || '',
          description: data.description || '',
          price: data.price || '',
          category: data.category || ''
        });
      } 
      else {
        alert('Could not fetch product details.');
        navigate('/');
      }
    }
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmit(e) {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in to edit a product!');
    navigate('/login');
    return;
  }

  const formData = new FormData();
  formData.append('title', form.title);
  formData.append('description', form.description);
  formData.append('price', form.price);
  formData.append('category', form.category);

  if (file) formData.append('file', file);

  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: formData
    });

    const data = await res.json();

    if (res.ok) {
      alert('Product updated successfully!');
      navigate(`/products/${id}`);
    } else {
      alert(data.error || 'Failed to update product.');
    }
  } catch (err) {
    console.error(err);
    alert('An unexpected error occurred. Please try again.');
  }
}


  return (
    <div className="add-product-container">
      <div className="add-product-box">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
