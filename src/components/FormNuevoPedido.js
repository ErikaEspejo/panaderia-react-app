import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api';

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
    console.log(totalProducts);

    const arrayProducts = [];
    totalProducts.forEach((el) => {
      const string = `${el.id},${parseInt(el.quantity)},${el.cost},${
        el.quantity * el.cost
      }`;
      arrayProducts.push(string);
    });

    let totalValue = 0;
    totalProducts.forEach((el) => {
      totalValue += parseInt(el.quantity * el.cost);
    });

    if (idBuyer.value && buyer.value && arrayProducts) {
      try {
        setError('');
        await API.createOrder({
          buyer: `${idBuyer.value} - ${buyer.value}`,
          order: arrayProducts.join(';'),
          totalValue,
        });
        setSuccess('El pedido ha sido generado con exito');
        setTimeout(() => {
          history.push('/sales/active');
        }, 700);
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
    <>
      <h3>Nuevo Pedido - Mesa No. {id}</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="">
          Identificación:
          <input name="idBuyer" type="text" />{' '}
        </label>
        <label htmlFor="">
          Comprador:
          <input name="buyer" type="text" />{' '}
        </label>

        <div style={{ display: 'flex', gap: '30px' }}>
          <div>
            <h3>Productos</h3>
            <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
              <option disabled selected>
                Filtre por categoría
              </option>
              {categories.map((el, i) => {
                return <option value={el}>{el}</option>;
              })}
            </select>
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
                        {el.product}
                      </div>
                    );
                  }
                })
              : null}
          </div>

          <div>
            <h3>Pedido</h3>
            <h3>ID - Producto - Cantidad</h3>
            <div>
              {totalProducts.map((el, i) => {
                return (
                  <p>
                    <span>{el.product}</span>
                    <input
                      type="number"
                      placeholder="Cantidad"
                      onChange={(e) => (el.quantity = e.target.value)}
                      min="0"
                      max={el.maxQuantity}
                    />
                    <button
                      onClick={() =>
                        setTotalProducts(
                          totalProducts.filter((element) => element !== el)
                        )
                      }
                    >
                      X
                    </button>
                  </p>
                );
              })}
            </div>
            <button type="submit">Guardar Pedido</button>
          </div>
        </div>
      </form>
      <button onClick={onClose}>Cancelar</button>
    </>
  );
}
