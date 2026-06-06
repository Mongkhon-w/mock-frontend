import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // จำลองฐานข้อมูลผู้ใช้งาน (มี admin เริ่มต้นให้ 1 คน)
  const [usersDb, setUsersDb] = useState([{ username: 'admin', password: '1234' }]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // ฟังก์ชันสมัครสมาชิก (Register)
  const registerUser = (username, password) => {
    // เช็คว่ามี username นี้ในระบบหรือยัง
    const userExists = usersDb.find(u => u.username === username);
    if (userExists) {
      return { success: false, message: 'Username นี้มีผู้ใช้งานแล้ว!' };
    }
    
    // ถ้ายังไม่มี ให้บันทึกเพิ่มเข้าไป
    setUsersDb(prev => [...prev, { username, password }]);
    return { success: true, message: 'สมัครสมาชิกสำเร็จ!' };
  };

  // ฟังก์ชันเข้าสู่ระบบ (Login)
  const login = (username, password) => {
    // ค้นหาว่ามี user และ password ตรงกับในฐานข้อมูลจำลองไหม
    const user = usersDb.find(u => u.username === username && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <AppContext.Provider value={{ 
      isSidebarOpen, toggleSidebar, 
      theme, toggleTheme, 
      isAuthenticated, login, logout, registerUser 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);