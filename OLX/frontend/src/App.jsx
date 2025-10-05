import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import EditProductDetails from "./Pages/EditProductDetails";
import AddProduct from "./Pages/AddProduct";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile.jsx";

function App() {
  // State for Login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State for UserID
  const [userId, setUserId] = useState(null);
  // State for Loading
  const [loading, setLoading] = useState(true);
  // State for Search bar query
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
       try {
          const decoded = jwtDecode(token);
          if (decoded.id) {
            setIsLoggedIn(true);
            setUserId(decoded.id);
          } 
          else {
            console.warn("User ID not found in token.");
            setIsLoggedIn(false);
            setUserId(null);
          }
      } 
      catch (err) {
          console.error("Error decoding token:", err);
          setIsLoggedIn(false);
          setUserId(null);
      }
    } 
    else {
      setIsLoggedIn(false);
      setUserId(null);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>Loading... Please Wait</h1>;
  }

  // When logout button is clicked
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId(null);
  };

  // When Login form is submitted
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    try {
        const decoded = jwtDecode(token);
        if (decoded.id) {
          setIsLoggedIn(true);
          setUserId(decoded.id);
        } 
        else {
          throw new Error("User ID missing in token");
        }
    } 
    catch (err) {
        console.error("Error decoding token on login:", err);
        setIsLoggedIn(false);
        setUserId(null);
    }
  };

  return (
    <BrowserRouter>

      <NavBar
        isLoggedIn={isLoggedIn}
        userId={userId}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Routes>
        {/* Home products page */}
        <Route path="/" element={<Products searchQuery={searchQuery} />} />

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Product routes */}
        <Route path="/products/new" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/edit/:id" element={<EditProductDetails />} />

        {/* Profile route */}
        <Route path="/profile/:id" element={<Profile searchQuery={searchQuery} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
