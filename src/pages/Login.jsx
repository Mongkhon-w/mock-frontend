import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { loginAPI } from '../services/authService'; // นำเข้า API Service 

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State สำหรับปุ่ม Loading
  
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => { // async เพื่อรอ API
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      // 1. ยิง API ไปตรวจสอบกับ Backend (MariaDB)
      const result = await loginAPI(username, password);
      
      if (result.success) {
        // 2. ถ้าสำเร็จ ให้ฝัง Token ลงในเบราว์เซอร์ (แก้ปัญหารีเฟรชแล้วหลุด)
        localStorage.setItem('authToken', result.token);
        
        // 3. อัปเดตสถานะใน AppContext
        login(); 
        
        // 4. พาไปหน้า Dashboard
        navigate('/'); 
      }
    } catch (err) {
      // ดักจับ Error ที่ Backend ส่งกลับมา (เช่น รหัสผิด)
      setErrorMsg(err.message || 'Username หรือ Password ไม่ถูกต้อง!');
    } finally {
      setIsLoading(false);
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
          <button 
            type="submit" 
            className="btn-submit" 
            disabled={isLoading} // 👈 ป้องกันการกดเบิ้ลตอนโหลด
            style={{ 
              marginTop: '8px', 
              padding: '12px', 
              fontSize: '1.1rem', 
              backgroundColor: isLoading ? '#9ca3af' : '#0ea5e9',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'กำลังตรวจสอบ...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center', color: '#6b7280' }}>
          ยังไม่มีบัญชีใช่ไหม? <Link to="/register" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>สมัครสมาชิกเลย</Link>
        </p>
      </div>
    </div>
  );
};