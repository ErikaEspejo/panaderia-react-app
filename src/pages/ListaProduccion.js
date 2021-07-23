import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsClockHistory } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Headers from '../components/Headers';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';

const QueryBar = () => {
  return (
    <>
      <input type="text" placeholder="Filtrar por fecha" />

      <Link to="/hallazgo/nuevo">
        <button className="action-button"> + Nuevo</button>
      </Link>
    </>
  );
};

const Production = ({ id, date, production }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{format(new Date(date), 'MM/dd/yyyy')}</td>
      <td>
        {production.map((el, index) => {
          return (
            <p key={index}>
              {el.product.name} - {el.quantity} unidad(es)
            </p>
          );
        })}
      </td>

      <td className="actions">
        <button className="action-button">Eliminar</button>
      </td>
    </tr>
  );
};

const ListaProduccion = () => {
  const columns = ['ID', 'Fecha', 'Producción', ''];

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.listProduction();
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
      <Headers title="Historial de Producción" icon={<BsClockHistory />} />
      <Container>
        <QueryBar />
        <Table columns={columns}>
          {data.map(({ id, date, production }) => {
            return (
              <Production
                key={id}
                id={id}
                date={date}
                production={production}
              />
            );
          })}
        </Table>
      </Container>
    </>
  );
};

export default ListaProduccion;