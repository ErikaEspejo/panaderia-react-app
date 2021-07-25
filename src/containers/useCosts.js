import { useCallback, useState, useEffect } from 'react';
import API from '../api';

export default function useCosts({ id }) {
  const [cost, setCost] = useState(null);
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadCost = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await API.getCost({ id });
      if (data) {
        setCost(data);
        setDate(data.date.substring(0, 10));
      }
    } catch (error) {
      setError(error?.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id !== undefined) {
      loadCost();
    }
  }, [id, loadCost]);

  return {
    date,
    cost,
    error,
    isLoading,
  };
}
