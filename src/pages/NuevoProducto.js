import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';
import Headers from '../components/Headers';
import Container from '../containers/Container';
import './styles/productos.css';

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

const supplies = [Object.assign({}, original)];
const NuevoProducto = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [totalSupplies, setTotalSupplies] = useState(supplies);

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

  useEffect(() => {
    loadList();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    setTotalSupplies([...totalSupplies, Object.assign({}, original)]);
  };

  async function onSubmit(event) {
    event.preventDefault();
    const { product, cost, category } = event.target.elements;

    const arraySupplies = [];
    totalSupplies.forEach((el) => {
      const string = `${el.value},${el.quantity},${el.units}`;
      arraySupplies.push(string);
    });

    if (product.value && cost.value && category.value) {
      try {
        setError('');
        await API.createProduct({
          product: product.value,
          category: category.value,
          supplies: arraySupplies.join(';'),
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
          <div className="product-data">
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
          </div>

          <h3>Insumos requeridos</h3>

          <div>
            <button className="action-button add" onClick={handleAdd}>
              Agregar
            </button>
            <div className="product-supplies">
              {!!totalSupplies &&
                totalSupplies.map((el, index) => {
                  return (
                    <div>
                      <select
                        required
                        name={index}
                        onChange={(e) => (el.value = e.target.value)}
                      >
                        <option value="" selected disabled>
                          Seleccione el insumo
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
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="buttons">
            <button type="submit" className="action-button">
              {' '}
              <FaSave /> Guardar Producto
            </button>
            <button
              className="action-button"
              onClick={() => {
                history.push('/produccion/productos');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default NuevoProducto;
