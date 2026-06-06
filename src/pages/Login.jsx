// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isSuccess = login(username, password);
    
    if (isSuccess) {
      navigate('/'); 
    } else {
      setErrorMsg('Username หรือ Password ไม่ถูกต้อง!');
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2 style={{ marginBottom: '24px', color: '#0ea5e9', textAlign: 'center' }}>เข้าสู่ระบบ</h2>
        
        {errorMsg && (
          <div style={{ padding: '10px', marginBottom: '16px', background: '#fee2e2', color: '#b91c1c', borderRadius: '6px', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="text" 
            placeholder="Username" 
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit" style={{ marginTop: '8px', padding: '12px', fontSize: '1.1rem', backgroundColor: '#0ea5e9' }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center', color: '#6b7280' }}>
          ยังไม่มีบัญชีใช่ไหม? <Link to="/register" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>สมัครสมาชิกเลย</Link>
        </p>
      </div>
    </div>
  );
};