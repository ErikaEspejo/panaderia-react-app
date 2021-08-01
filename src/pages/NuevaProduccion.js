import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

import Headers from '../components/Headers';
import Container from '../containers/Container';

const original = {
  option: [],
  value: '',
  quantity: '',
  units: '',
};
const products = [Object.assign({}, original)];
const NuevaProduccion = () => {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [totalProducts, setTotalProducts] = useState(products);
  async function loadList() {
    try {
      const data = await API.listProducts();
      if (data) {
        setData(data);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    setTotalProducts([...totalProducts, Object.assign({}, original)]);
  };

  async function onSubmit(event) {
    event.preventDefault();
    const { date } = event.target.elements;

    const arrayProducts = [];
    totalProducts.forEach((el) => {
      const string = `${el.value.substring(0, 1)},${el.quantity}`;
      arrayProducts.push(string);
    });

    const production = arrayProducts.join(';');
    if (date.value && production) {
      try {
        setError('');
        await API.createProduction({
          date: date.value,
          production,
        });

        history.push('/produccion');
      } catch (error) {
        console.log(error);
        setError(
          'La producción no ha podido ser creado o se ha creado incorrectamente'
        );
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  return (
    <>
      <Headers title="Nueva Producción" icon={<IoIosCreate />} />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <label htmlFor="">
            Fecha
            <input type="date" name="date" />
          </label>
          <h3>Productos</h3>
          <button onClick={handleAdd}>Agregar</button>
          {!!totalProducts &&
            totalProducts.map((el, index) => {
              return (
                <>
                  <select
                    required
                    name={index}
                    onChange={(e) => (el.value = e.target.value)}
                  >
                    <option value="" selected disabled>
                      Seleccione el product
                    </option>
                    {data.map((el, index) => {
                      return (
                        <option key={index} value={`${el.id} - ${el.product}`}>
                          {el.id} - {el.product}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    required
                    type="number"
                    min="0"
                    onChange={(e) => (el.quantity = e.target.value)}
                  />
                </>
              );
            })}

          <button type="submit">
            {' '}
            <FaSave />
            Crear Producción
          </button>
          <button
            onClick={() => {
              history.push('/produccion');
            }}
          >
            Cancel
          </button>
        </form>
      </Container>
    </>
  );
};

export default NuevaProduccion;
