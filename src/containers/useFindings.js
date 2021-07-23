import { useCallback, useState, useEffect } from 'react';
import API from '../api';

export default function useFindings({ id }) {
  const [finding, setFinding] = useState(null);
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadFinding = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await API.getFinding({ id });
      if (data) {
        setFinding(data);
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
      loadFinding();
    }
  }, [id, loadFinding]);

  return {
    date,
    finding,
    error,
    isLoading,
  };
}
