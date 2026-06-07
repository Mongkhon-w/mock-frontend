import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ text: 'รหัสผ่านไม่ตรงกัน!', type: 'error' });
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ text: 'สมัครสมาชิกสำเร็จ!', type: 'success' });
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage({ text: data.message, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้', type: 'error' });
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2 style={{ color: '#10b981', textAlign: 'center' }}>สมัครสมาชิก</h2>
        {message.text && (
          <div style={{ padding: '10px', marginBottom: '16px', background: message.type === 'error' ? '#fee2e2' : '#d1fae5', color: message.type === 'error' ? '#b91c1c' : '#047857', borderRadius: '6px', textAlign: 'center' }}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="text" placeholder="Username" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" className="form-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="submit" className="btn-submit" style={{ backgroundColor: '#10b981' }}>Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link></p>
      </div>
    </div>
  );
};