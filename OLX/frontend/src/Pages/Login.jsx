import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

export default function Login({onLogin}) {
  const [form, setForm] = React.useState({});
  const navigate = useNavigate();

 async function handleSubmit(e) {
  e.preventDefault();
  const res = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(form)
  });
  const data = await res.json();

  if (res.ok) {
    // Call onLogin with token
    onLogin(data.token);
    alert('Logged in!');
    navigate('/');
  } 
  else {
    alert(data.error);
  }
}

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
