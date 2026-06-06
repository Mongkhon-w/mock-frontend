import React from 'react';

export const Card = ({ title, price }) => {
  return (
    <div className="card" style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>{title}</h3>
      <p>ราคา: ฿{price}</p>
      <button>Add to Cart</button>
    </div>
  );
};