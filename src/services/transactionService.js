// กำหนด URL ของ Backend API
const API_URL = 'http://localhost:3001/api/transactions';

// 1. ดึงข้อมูลทั้งหมดจากฐานข้อมูลจริง (GET)
export const fetchTransactions = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('ไม่สามารถดึงข้อมูลธุรกรรมจากเซิร์ฟเวอร์ได้');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch Transactions Error:', error);
    throw error;
  }
};

// 2. เพิ่มข้อมูลธุรกรรมใหม่ลงฐานข้อมูลจริง (POST)
export const addTransactionAPI = async (newData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    
    if (!response.ok) {
      throw new Error('ไม่สามารถเพิ่มข้อมูลธุรกรรมได้');
    }
    return await response.json();
  } catch (error) {
    console.error('Add Transaction Error:', error);
    throw error;
  }
};

// 3. ลบข้อมูลธุรกรรมออกจากฐานข้อมูลจริงตาม ID (DELETE)
export const deleteTransactionAPI = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('ไม่สามารถลบข้อมูลธุรกรรมได้');
    }
    return await response.json(); // จะได้รับ { success: true, id } กลับมา
  } catch (error) {
    console.error('Delete Transaction Error:', error);
    throw error;
  }
};