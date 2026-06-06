import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { useTransactions } from '../hooks/useTransactions'; 
import { exportDataAsJSON } from '../utils/exportUtils';
import { FiTrash2 } from 'react-icons/fi';

export const Dashboard = () => {
  const { data, loading, error, addTransaction, deleteTransaction } = useTransactions();
  const [formData, setFormData] = useState({ title: '', amount: '', type: 'income' });

  const handleExport = () => {
    exportDataAsJSON(data, 'financial_data_export.json');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!formData.title || !formData.amount) return; 

    addTransaction({
      title: formData.title,
      amount: formData.type === 'expense' ? -Math.abs(formData.amount) : Math.abs(formData.amount),
      type: formData.type
    });

    setFormData({ title: '', amount: '', type: 'income' });
  };

  // --- คำนวณยอดรวม ---
  const totalIncome = data
    .filter(item => item.type === 'income')
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  const totalExpense = data
    .filter(item => item.type === 'expense')
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  const netBalance = totalIncome - totalExpense;

  // --- จัดการสถานะ Loading และ Error ---
  if (loading) return <MainLayout><div style={{ padding: '50px', textAlign: 'center', color: '#6b7280' }}><h2>กำลังโหลดข้อมูล...</h2></div></MainLayout>;
  if (error) return <MainLayout><div style={{ padding: '20px', color: '#b91c1c', background: '#fee2e2', borderRadius: '8px' }}><h2>เกิดข้อผิดพลาด: {error}</h2></div></MainLayout>;

  return (
    <MainLayout>
      <h2>ภาพรวมแอปพลิเคชันการเงิน</h2>
      
      {/* สรุปยอดรวม */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #0ea5e9' }}>
          <h4 style={{ color: '#6b7280', marginBottom: '8px' }}>ยอดเงินคงเหลือ</h4>
          <h2 style={{ color: '#0ea5e9', fontSize: '2rem' }}>฿{netBalance.toLocaleString()}</h2>
        </div>
        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #10b981' }}>
          <h4 style={{ color: '#6b7280', marginBottom: '8px' }}>รายรับรวม</h4>
          <h2 style={{ color: '#10b981', fontSize: '1.8rem' }}>฿{totalIncome.toLocaleString()}</h2>
        </div>
        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #ef4444' }}>
          <h4 style={{ color: '#6b7280', marginBottom: '8px' }}>รายจ่ายรวม</h4>
          <h2 style={{ color: '#ef4444', fontSize: '1.8rem' }}>฿{totalExpense.toLocaleString()}</h2>
        </div>
      </div>
      
      {/* ฟอร์มเพิ่มข้อมูล */}
      <form onSubmit={handleSubmit} className="txn-form card" style={{ marginBottom: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="ชื่อรายการ" 
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="form-input"
          required
        />
        <input 
          type="number" 
          placeholder="จำนวนเงิน" 
          value={formData.amount} 
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          className="form-input"
          required
        />
        <select 
          value={formData.type} 
          onChange={(e) => setFormData({...formData, type: e.target.value})}
          className="form-input"
        >
          <option value="income">รายรับ (+)</option>
          <option value="expense">รายจ่าย (-)</option>
        </select>
        <button type="submit" className="btn-submit">เพิ่มรายการ</button>
      </form>

      <button onClick={handleExport} className="btn-export">Export Data (JSON)</button>
      
      {/* ตารางข้อมูล */}
      <div className="data-grid">
        {data.map(item => (
          <div key={item.id} className="card txn-card" style={{ borderLeft: `4px solid ${item.type === 'income' ? '#10b981' : '#ef4444'}`, position: 'relative' }}>
            <button 
              onClick={() => deleteTransaction(item.id)} 
              className="btn-delete"
              title="ลบรายการนี้"
            >
              <FiTrash2 size={18} />
            </button>
            
            <h4>{item.title}</h4>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: item.type === 'income' ? '#10b981' : '#ef4444' }}>
              {item.type === 'income' ? '+' : '-'} ฿{Math.abs(item.amount).toLocaleString()}
            </p>
            <small style={{ color: '#9ca3af' }}>วันที่: {item.date}</small>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};