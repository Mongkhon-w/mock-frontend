import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useApp();

  // ถ้ายังไม่ล็อกอิน ให้ Redirect (เด้งกลับ) ไปที่หน้า /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ถ้าล็อกอินแล้ว อนุญาตให้แสดงผลหน้าเว็บนั้นๆ ได้ (children)
  return children;
};