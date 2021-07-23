import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaUsersCog, FaPhoneAlt } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Headers from '../components/Headers';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';

const QueryBar = () => {
  return (
    <>
      <input type="text" placeholder="Filtrar por nombre" />
      <input type="text" placeholder="Buscar por NIT" />
      <Link to="/hallazgo/nuevo">
        <button className="action-button"> + Nuevo</button>
      </Link>
    </>
  );
};

const Product = ({ id, product, quantity, supplies, cost, category }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{product}</td>
      <td>$ {cost}</td>
      <td>{quantity} un</td>
      <td>{supplies}</td>
      <td>{category}</td>

      <td className="actions">
        <Link to={`/accesos`}>
          <button className="action-button">Modificar</button>
        </Link>
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
      <Headers title="Administrar Accesos" icon={<FaUsersCog />} />
      <Container>
        <QueryBar />
        <Table columns={columns}>
          {data.map(({ id, product, quantity, supplies, cost, category }) => {
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
          })}
        </Table>
      </Container>
    </>
  );
};

export default ListaProductos;
