import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Layout.css';

export const MainLayout = ({ children }) => {
  const { isSidebarOpen, toggleSidebar, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // พอกดปุ่มให้เด้งไปหน้าล็อกอิน
  };

  return (
    <div className="layout-container">
      <nav className="navbar">
        <button className="menu-btn" onClick={toggleSidebar}>☰</button>
        <span>Application Logo</span>
      </nav>

      <div className="main-wrapper">
        {/* เปลี่ยน aside เป็น flex แบบ column เพื่อใช้พื้นที่ให้เต็ม */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* ใส่ flex: 1 เพื่อดันเนื้อหาส่วนที่เหลือ (ปุ่มล่างสุด) ให้ตกลงไป */}
          <ul style={{ flex: 1 }}>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                end
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products" 
                className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
              >
                Settings
              </NavLink>
            </li>
          </ul>

          {/* ส่วนของปุ่ม Logout จะถูกดันมาอยู่ล่างสุดอัตโนมัติ */}
          <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
            <button 
              onClick={handleLogout} 
              style={{ width: '100%', padding: '10px', background: '#ef4444', color: 'white', border: 'none', fontWeight: 'bold' }}
            >
              Logout ออกจากระบบ
            </button>
          </div>
          
        </aside>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};