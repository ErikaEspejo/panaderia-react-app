import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

import Headers from '../components/Headers';
import Container from '../containers/Container';

let totalProducts = [];
let products = [];

const NuevoProveedor = () => {
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [inputQuantity, setInputQuantity] = useState('');

  const agregarProducto = (event) => {
    event.preventDefault();
    totalProducts.push({
      product: input.substring(4),
      quantity: inputQuantity,
    });
    products.push(`${input.substring(0, 1)},${inputQuantity}`);
    console.log(totalProducts, products);
  };

  async function loadList() {
    try {
      const data = await API.listProducts();
      if (data) {
        setProduct(data);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const { date } = event.target.elements;

    const production = products.join(';');

    if (date.value && production) {
      try {
        setError('');
        await API.createProduction({
          date: date.value,
          production,
        });
        totalProducts = [];
        products = [];
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
          <button onClick={agregarProducto}>Agregar producto</button>
          <select value={input} onInput={(e) => setInput(e.target.value)}>
            <option selected>Seleccione el producto</option>
            {product.map((element, index) => {
              return (
                <option key={index}>
                  {element.id} - {element.product}
                </option>
              );
            })}
          </select>
          <label htmlFor="">
            Cantidad
            <input
              type="number"
              value={inputQuantity}
              onInput={(e) => setInputQuantity(e.target.value)}
            />
          </label>
          <ul>
            {totalProducts.map((el, index) => {
              return (
                <li key={index}>
                  {el.product} - {el.quantity} unidades
                </li>
              );
            })}
          </ul>

          <button type="submit">
            {' '}
            <FaSave /> Guardar Proveedor
          </button>
          <button
            onClick={() => {
              totalProducts = [];
              products = [];
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

export default NuevoProveedor;
