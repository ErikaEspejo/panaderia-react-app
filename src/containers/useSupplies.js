import { useCallback, useState, useEffect } from 'react';
import API from '../api';

export default function useSupplies({ id }) {
  const [supply, setSupply] = useState(null);
  const [providerId, setProviderId] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadProvider = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await API.getSupply({ id });
      if (data) {
        setSupply(data);
        setProviderId(data.ProviderId);
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
      loadProvider();
    }
  }, [id, loadProvider]);

  return {
    providerId,
    supply,
    error,
    isLoading,
  };
}
