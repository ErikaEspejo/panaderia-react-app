import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api';
import '../pages/styles/pedido.css';
import Alert from '../components/Alert';

const categories = [
  'Panaderia',
  'Reposteria',
  'Mecato',
  'Gaseosas',
  'Bebidas Calientes',
  'Articulos Eventos',
];

const original = {
  value: '',
  quantity: '',
  units: '',
};

const products = [Object.assign({}, original)];

export default function FormNuevoPedido({ onClose, id }) {
  const history = useHistory();
  const [success, setSuccess] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [totalProducts, setTotalProducts] = useState([]);
  const [category, setCategory] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    const { idBuyer, buyer } = event.target.elements;

    const arrayProducts = [];
    totalProducts.forEach((el) => {
      const string = `${el.id},${parseInt(el.quantity)},${el.cost},${
        parseInt(el.quantity) * el.cost
      }`;
      arrayProducts.push(string);
    });

    let totalValue = 0;
    totalProducts.forEach((el) => {
      totalValue += parseInt(el.quantity * el.cost);
    });

    if (idBuyer.value && buyer.value && arrayProducts.length > 0) {
      try {
        setError('');
        await API.createOrder({
          buyer: `${idBuyer.value} - ${buyer.value}`,
          order: arrayProducts.join(';'),
          totalValue,
          table: id,
        });
        setSuccess('El pedido ha sido generado con exito');
        setTimeout(() => {
          history.push('/sales/active');
        }, 200);
      } catch (error) {
        console.log(error);
        setError(
          'El pedido no ha podido ser generado con exito o se ha generado incorrectamente'
        );
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

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

  return (
    <div className="order">
      {error && <Alert severity="error" message={error} />}
      <h3>Nuevo Pedido - Mesa No. {id}</h3>
      <form onSubmit={onSubmit}>
        <div className="buyer-data">
          <label htmlFor="">
            Identificación:
            <input required name="idBuyer" type="text" />{' '}
          </label>
          <label htmlFor="">
            Comprador:
            <input required name="buyer" type="text" />{' '}
          </label>
        </div>

        <div className="order-details">
          <div className="order-products">
            <h4>Productos</h4>
            <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
              <option disabled selected>
                Filtre por categoría
              </option>
              {categories.map((el, i) => {
                return (
                  <option key={i} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
            <div className="list-prods">
              {category
                ? data.map((el, i) => {
                    if (el.category === category) {
                      return (
                        <div
                          onClick={() =>
                            setTotalProducts([
                              ...totalProducts,
                              {
                                id: el.id,
                                product: el.product,
                                quantity: '',
                                maxQuantity: el.quantity,
                                cost: el.cost,
                              },
                            ])
                          }
                        >
                          <li className="list-product">{el.product}</li>
                        </div>
                      );
                    }
                  })
                : null}
            </div>
          </div>

          <div>
            <h4>Pedido</h4>
            <h5>Producto - Cantidad</h5>
            <div className="order-final">
              {totalProducts.map((el, i) => {
                return (
                  <div className="order-final-prods">
                    <span>{el.product}</span>
                    <div>
                      <input
                        className="quantity"
                        required
                        type="number"
                        onChange={(e) => (el.quantity = e.target.value)}
                        min="0"
                        max={el.maxQuantity}
                      />
                      <button
                        className="close-button"
                        onClick={() =>
                          setTotalProducts(
                            totalProducts.filter((element) => element !== el)
                          )
                        }
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="action-button" type="submit">
              Guardar Pedido
            </button>
          </div>
        </div>
      </form>
      <button className="action-button" onClick={onClose}>
        Cancelar
      </button>
    </div>
  );
}
