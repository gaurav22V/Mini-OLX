import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import '../css/Profile.css';

function Profile({ searchQuery }) {
  const {id} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/profile/${id}`, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser(data.user);
        setProducts(data.products);
      } catch (err) {
        console.error(err);
        setUser(null);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <h2 className="loading">Loading profile...</h2>;
  if (!user) return <h2 className="error">User not found.</h2>;

  // Filter products based on searchQuery from NavBar 
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="profile-container">
      <section className="user-info">
        <h1>Username: {user.username}</h1>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phone}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </section>

      <section className="profile-products-section">
        <h2>Products</h2>

        {filteredProducts.length === 0 ? (
          <p className="no-products">No products found.</p>
        ) : (
          <div className="profile-products-container">
            {filteredProducts.map(p => (
              <ProductCard
                key={p._id}
                product={p}
                onClick={() => navigate(`/products/${p._id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
