import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  
  // 💡 แก้ไข: เช็คจาก localStorage ตั้งแต่ต้น ถ้ามี Token แปลว่าล็อกอินอยู่
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // ฟังก์ชัน Login (ตอนนี้เราย้ายไปทำ API Call ที่หน้า Login แล้ว ฟังก์ชันนี้แค่เปลี่ยนสถานะใน UI)
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // ลบ Token ออกเมื่อ Logout
    setIsAuthenticated(false);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <AppContext.Provider value={{ 
      isSidebarOpen, toggleSidebar, 
      theme, toggleTheme, 
      isAuthenticated, login, logout 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);