// จำลองฐานข้อมูล (In-memory Database)
let mockTransactions = [
  { id: 'TXN-001', title: "เงินเดือนเข้า", amount: 45000, type: "income", date: "2026-05-28" },
  { id: 'TXN-002', title: "ค่าใช้จ่ายเซิร์ฟเวอร์", amount: -1500, type: "expense", date: "2026-05-29" },
  { id: 'TXN-003', title: "รายได้จากแอปพลิเคชัน", amount: 12500, type: "income", date: "2026-05-30" },
];

// ดึงข้อมูลทั้งหมด
export const fetchTransactions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockTransactions]), 800);
  });
};

// เพิ่มข้อมูล (Create)
export const addTransactionAPI = async (newData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTxn = {
        id: `TXN-${Math.floor(Math.random() * 10000)}`, 
        ...newData,
        date: new Date().toISOString().split('T')[0] 
      };
      mockTransactions.unshift(newTxn); 
      resolve(newTxn);
    }, 500);
  });
};

// ลบข้อมูล (Delete)
export const deleteTransactionAPI = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockTransactions = mockTransactions.filter(txn => txn.id !== id);
      resolve({ success: true, id });
    }, 500);
  });
};