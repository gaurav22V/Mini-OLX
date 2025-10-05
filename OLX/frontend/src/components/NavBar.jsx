import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

export default function NavBar({ isLoggedIn, userId, onLogout, searchQuery, setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className='navBar'>
        <div className="left">
          <Link to="/" style={{ fontWeight: '700' }}>OLX</Link>
        </div>

        <div className='searchBar'>
          <input
            type='search'
            placeholder='Search for a Product'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ul className='right desktop-links'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products/new">Add Product</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to={`/profile/${userId}`}>Profile</Link></li>
              <li><Link to="/" onClick={onLogout}><button className='logout-btn'>Logout</button></Link></li>
            </>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>

        {/* Hamburger button */}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </nav>

      {/* Side menu for mobile screens */}
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>×</button>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/products/new" onClick={toggleMenu}>Add Product</Link></li>
          {isLoggedIn ? (
            <>
            
              <li><Link to={`/profile/${userId}`} onClick={toggleMenu}>Profile</Link></li>
              <li><button className="logout-btn" onClick={onLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
              <li><Link to="/register" onClick={toggleMenu}>Register</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}