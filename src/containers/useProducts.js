import { useCallback, useState, useEffect } from 'react';
import API from '../api';

const suppliesObj = (item) => {
  const suppliesArray = item.split(';');
  const obj = suppliesArray.map((el) => {
    const splitted = el.split(',');
    return {
      supply: splitted[0],
      quantity: splitted[1],
      units: splitted[2],
    };
  });
  return obj;
};

export default function useSupplies({ id }) {
  const [product, setProduct] = useState(null);
  const [supplies, setSupplies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        setIsLoading(true);
        const data = await API.getProduct({ id });
        if (data) {
          const array = suppliesObj(data.supplies);
          setProduct(data);
          setSupplies(array);
        }
      } catch (error) {
        setError(error?.message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id !== undefined) {
      loadProvider();
    }
  }, [id]);

  return {
    supplies,
    product,
    error,
    isLoading,
  };
}
