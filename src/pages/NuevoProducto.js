import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

import Headers from '../components/Headers';
import Container from '../containers/Container';

const categories = [
  'Panaderia',
  'Reposteria',
  'Mecato',
  'Gaseosas',
  'Bebidas Calientes',
  'Articulos Eventos',
];

const NuevoProducto = () => {
  const history = useHistory();
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const { product, cost, supplies, category } = event.target.elements;

    if (product.value && cost.value && category.value) {
      try {
        setError('');
        await API.createProduct({
          product: product.value,
          category: category.value,
          supplies: supplies.value,
          cost: parseFloat(cost.value),
        });
        history.push('/produccion/productos');
      } catch (error) {
        console.log(error);
        setError(
          'El producto no ha podido ser creado o se ha creado incorrectamente'
        );
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  return (
    <>
      <Headers title="Nuevo Producto" icon={<IoIosCreate />} />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <label htmlFor="">
            Nombre del Producto
            <input type="text" name="product" />
          </label>
          <label htmlFor="">
            Categoria del Producto
            <select name="category">
              {categories.map((el, index) => {
                return <option key={index}>{el}</option>;
              })}
            </select>
          </label>
          <label htmlFor="">
            Valor de Venta $
            <input type="number" name="cost" step="0.01" />
          </label>

          <h3>Insumos requeridos</h3>
          <hr />
          <textarea name="supplies"></textarea>

          <button type="submit">
            {' '}
            <FaSave /> Guardar Producto
          </button>
          <button
            onClick={() => {
              history.push('/produccion/productos');
            }}
          >
            Cancel
          </button>
        </form>
      </Container>
    </>
  );
};

export default NuevoProducto;
