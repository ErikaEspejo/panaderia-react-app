import { useCallback, useState, useEffect } from 'react';
import API from '../api';

export default function useUsers({ id }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await API.getUser({ id });
      if (data) {
        setUser(data);
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
      loadUser();
    }
  }, [id, loadUser]);

  return {
    user,
    error,
    isLoading,
  };
}
