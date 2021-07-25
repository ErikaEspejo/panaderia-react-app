import { useCallback, useState, useEffect } from 'react';
import API from '../api';

export default function useSupplies({ id }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadProvider = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await API.getProduct({ id });
      if (data) {
        setProduct(data);
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
    product,
    error,
    isLoading,
  };
}
