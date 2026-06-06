export const exportDataAsJSON = (data, filename = 'data_export.json') => {
  // แปลง Object/Array เป็น JSON String
  const jsonString = JSON.stringify(data, null, 2);
  
  // สร้าง Blob เพื่อเตรียมดาวน์โหลด
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // จำลองการคลิกลิงก์เพื่อดาวน์โหลดไฟล์
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};