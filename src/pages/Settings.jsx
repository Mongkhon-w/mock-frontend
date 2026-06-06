import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useApp } from '../context/AppContext';

export const Settings = () => {
  const { theme, toggleTheme } = useApp(); // เรียกใช้ Global State

  return (
    <MainLayout>
      <h2>System Settings</h2>
      <div className="card">
        <p>Current Theme: <strong>{theme}</strong></p>
        <button onClick={toggleTheme} style={{ padding: '8px 16px' }}>
          Toggle Theme
        </button>
      </div>
    </MainLayout>
  );
};