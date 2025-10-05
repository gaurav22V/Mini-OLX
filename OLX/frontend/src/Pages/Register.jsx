import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../css/register.css';

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Registered!');
    navigate('/login');
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input placeholder="Username" onChange={e=>setForm({...form, username:e.target.value})}/>
          </div>
          <div className="form-group">
            <input placeholder="Email" onChange={e=>setForm({...form, email:e.target.value})}/>
          </div>
          <div className="form-group">
            <input placeholder="Password" type="password" onChange={e=>setForm({...form, password:e.target.value})}/>
          </div>
          <div className="form-group">
            <input placeholder="Phone" onChange={e=>setForm({...form, phone:e.target.value})}/>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
