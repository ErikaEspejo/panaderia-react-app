import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useStore } from '../store/Store';
import { useHistory, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import { formatISO } from 'date-fns';
import useProducts from '../containers/useProducts';

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

const units = ['Kg', 'g', 'Lt', 'Lb'];

const original = {
  option: [],
  value: '',
  quantity: '',
  units: '',
};

const suppliesList = [Object.assign({}, original)];

const ModificarProveedor = () => {
  const { id } = useParams();
  const { product, supplies } = useProducts({ id });
  const history = useHistory();

  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [modifySupplies, setModifySupplies] = useState(false);
  const [totalSupplies, setTotalSupplies] = useState(suppliesList);
  const [localSupplies, setLocalSupplies] = useState(null);

  let supply = supplies.length > 0 ? supplies : null;

  async function loadList() {
    try {
      const data = await API.listSupplies();
      if (data) {
        setData(data);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  const handleAdd = (e) => {
    e.preventDefault();
    setTotalSupplies([...totalSupplies, Object.assign({}, original)]);
  };
  const handleModify = (e) => {
    e.preventDefault();
    setModifySupplies(true);
  };
  const handleUnshow = (e) => {
    e.preventDefault();
    setModifySupplies(false);
    setTotalSupplies(suppliesList);
  };
  const handleRemove = (index) => {
    setLocalSupplies(localSupplies.filter((el, id) => id !== index));
  };

  useEffect(() => {
    loadList();
    setLocalSupplies(supply);
  }, [supply]);

  async function onSubmit(event) {
    event.preventDefault();

    const arraySupplies = [];
    localSupplies.forEach((el) => {
      const string = `${el.value ? el.value : el.supply},${el.quantity},${
        el.units
      }`;
      arraySupplies.push(string);
    });

    if (modifySupplies) {
      totalSupplies.forEach((el) => {
        const string = `${el.value},${el.quantity},${el.units}`;
        arraySupplies.push(string);
      });
    }

    console.log('supplies', arraySupplies);

    const { product, cost, category } = event.target.elements;

    if (product.value && cost.value && category.value) {
      try {
        setError('');
        await API.updateProduct({
          id,
          product: product.value,
          category: category.value,
          supplies: arraySupplies.join(';'),
          cost: parseFloat(cost.value),
        });
        history.push('/produccion/productos');
      } catch (error) {
        console.log(error);
        setError('El producto no ha podido ser actualizado correctamente');
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  if (!product) return null;
  if (!localSupplies) return null;

  return (
    <>
      <Headers
        title={`Modificar Product - "${product.product}"`}
        icon={<IoIosCreate />}
      />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <label htmlFor="">
            Nombre del Producto
            <input type="text" name="product" defaultValue={product.product} />
          </label>
          <label htmlFor="">
            Categoria del Producto
            <select name="category">
              <option selected disabled>
                {product.category}
              </option>
              {categories.map((el, index) => {
                return <option key={index}>{el}</option>;
              })}
            </select>
          </label>
          <label htmlFor="">
            Valor de Venta $
            <input
              type="number"
              name="cost"
              step="0.01"
              defaultValue={product.cost}
            />
          </label>

          <h3>Insumos requeridos</h3>
          <hr />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {localSupplies.length > 0
              ? localSupplies.map((el, index) => {
                  return (
                    <div key={index}>
                      <select
                        name={index}
                        onChange={(e) => (el.value = e.target.value)}
                      >
                        <option value="" selected disabled>
                          {el.supply}
                        </option>
                        {data.map((el, index) => {
                          return (
                            <option key={index} value={el.name}>
                              {el.name}
                            </option>
                          );
                        })}
                      </select>
                      <input
                        required
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue={el.quantity}
                        onChange={(e) => (el.quantity = e.target.value)}
                      />
                      <select
                        name={index}
                        onChange={(e) => (el.units = e.target.value)}
                      >
                        <option value="" selected disabled>
                          {el.units}
                        </option>
                        {units.map((el, index) => {
                          return (
                            <option key={index} value={el}>
                              {el}
                            </option>
                          );
                        })}
                      </select>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemove(index);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })
              : ''}
          </div>
          <div>
            {!modifySupplies ? (
              <button onClick={handleModify}>Crear mas insumos</button>
            ) : null}
            {modifySupplies ? (
              <>
                <button onClick={handleAdd}>Agregar</button>
                {!!totalSupplies &&
                  totalSupplies.map((el, index) => {
                    return (
                      <>
                        <select
                          required
                          name={index}
                          onChange={(e) => (el.value = e.target.value)}
                        >
                          <option value="">Seleccione el insumo</option>
                          {data.map((el, index) => {
                            return (
                              <option key={index} value={el.name}>
                                {el.name}
                              </option>
                            );
                          })}
                        </select>
                        <input
                          required
                          type="number"
                          min="0"
                          step="0.01"
                          onChange={(e) => (el.quantity = e.target.value)}
                        />
                        <select
                          required
                          name={index}
                          onChange={(e) => (el.units = e.target.value)}
                        >
                          <option value="" selected disabled>
                            Un.
                          </option>
                          {units.map((el, index) => {
                            return (
                              <option key={index} value={el}>
                                {el}
                              </option>
                            );
                          })}
                        </select>
                      </>
                    );
                  })}
                <button onClick={handleUnshow}>Cancelar</button>
              </>
            ) : null}
          </div>

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

export default ModificarProveedor;
