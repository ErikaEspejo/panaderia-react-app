import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GiSlicedBread } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import Headers from '../components/Headers';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';

const QueryBar = () => {
  const history = useHistory();
  return (
    <>
      <input type="text" placeholder="Filtrar por nombre" />
      <input type="text" placeholder="Buscar por NIT" />

      <button
        className="action-button"
        onClick={() => history.push('/produccion/producto/nuevo')}
      >
        + Nuevo
      </button>
    </>
  );
};

const Product = ({ id, product, quantity, supplies, cost, category }) => {
  const history = useHistory();
  return (
    <tr>
      <td>{id}</td>
      <td>{product}</td>
      <td>$ {cost}</td>
      <td>{quantity} un</td>
      <td>{supplies}</td>
      <td>{category}</td>

      <td className="actions">
        <button
          className="action-button"
          onClick={() => history.push(`/produccion/producto/${id}`)}
        >
          Modificar
        </button>

        <button className="action-button">Eliminar</button>
      </td>
    </tr>
  );
};

const ListaProductos = () => {
  const columns = [
    'Ref',
    'Producto',
    'Valor Unitario',
    'Cantidad',
    'Insumos',
    'Categoría',
    '',
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

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
      <Headers title="Lista de Productos" icon={<GiSlicedBread />} />
      <Container>
        <QueryBar />
        <Table columns={columns}>
          {data
            .map(({ id, product, quantity, supplies, cost, category }) => {
              return (
                <Product
                  key={id}
                  id={id}
                  product={product}
                  quantity={quantity}
                  supplies={supplies}
                  cost={cost}
                  category={category}
                />
              );
            })
            .sort()
            .reverse()}
        </Table>
      </Container>
    </>
  );
};

export default ListaProductos;
