import { useState, useEffect } from 'react';
import { fetchTransactions, addTransactionAPI, deleteTransactionAPI } from '../services/transactionService';

export const useTransactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchTransactions();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addTransaction = async (newData) => {
    try {
      const newTxn = await addTransactionAPI(newData);
      setData(prevData => [newTxn, ...prevData]); 
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteTransactionAPI(id);
      setData(prevData => prevData.filter(item => item.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return { data, loading, error, addTransaction, deleteTransaction };
};