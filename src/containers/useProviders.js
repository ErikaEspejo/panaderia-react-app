import { useCallback, useState, useEffect } from 'react';
import API from '../api';

export default function useProviders({ id }) {
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState([]);

  const loadProvider = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await API.getProvider({ id });
      if (data) {
        setProvider(data);
        const addressSplitted = data.address.split('/');
        setAddress([
          addressSplitted[0],
          addressSplitted[1],
          addressSplitted[2],
        ]);
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
    address,
    provider,
    error,
    isLoading,
  };
}
