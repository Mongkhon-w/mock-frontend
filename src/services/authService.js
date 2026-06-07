export const loginAPI = async (username, password) => {
  const response = await fetch('http://localhost:3001/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};