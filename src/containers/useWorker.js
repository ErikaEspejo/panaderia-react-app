import { useCallback, useState, useEffect } from 'react';
import API from '../api';

export default function useWorker({ id }) {
  const [worker, setWorker] = useState(null);

  const [entryDate, setEntryDate] = useState('');
  const [retreatDate, setRetreatDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadWorker = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await API.getWorker({ id });
      if (data) {
        setWorker(data);

        setEntryDate(data.entryDate.substring(0, 10));
        setRetreatDate(data.retreatDate.substring(0, 10));
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
      loadWorker();
    }
  }, [id, loadWorker]);

  return {
    entryDate,
    retreatDate,
    worker,
    error,
    isLoading,
  };
}
