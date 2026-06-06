import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { useProducts } from '../hooks/useTransactions';

export const Home = () => {
  // เรียกใช้ Logic จาก Hook
  const { products, loading } = useProducts();

  if (loading) return <MainLayout><p>Loading...</p></MainLayout>;

  return (
    <MainLayout>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        {products.map((product) => (
          <Card key={product.id} title={product.title} price={product.price} />
        ))}
      </div>
    </MainLayout>
  );
};