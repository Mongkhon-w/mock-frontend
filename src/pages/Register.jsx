import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const { registerUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage({ text: 'รหัสผ่านไม่ตรงกัน!', type: 'error' });
      return;
    }

    const result = registerUser(username, password);
    
    if (result.success) {
      setMessage({ text: result.message, type: 'success' });
      // สมัครเสร็จ หน่วงเวลา 1.5 วินาที แล้วเด้งไปหน้า Login
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setMessage({ text: result.message, type: 'error' });
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2 style={{ marginBottom: '24px', color: '#10b981', textAlign: 'center' }}>สมัครสมาชิก</h2>
        
        {message.text && (
          <div style={{ 
            padding: '10px', marginBottom: '16px', borderRadius: '6px', textAlign: 'center',
            background: message.type === 'error' ? '#fee2e2' : '#d1fae5', 
            color: message.type === 'error' ? '#b91c1c' : '#047857' 
          }}>
            {message.text}
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
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit" style={{ marginTop: '8px', padding: '12px', fontSize: '1.1rem', backgroundColor: '#10b981' }}>
            Register
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center', color: '#6b7280' }}>
          มีบัญชีอยู่แล้ว? <Link to="/login" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: 'bold' }}>เข้าสู่ระบบที่นี่</Link>
        </p>
      </div>
    </div>
  );
};