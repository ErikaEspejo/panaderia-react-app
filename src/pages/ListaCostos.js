import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GiTwoCoins } from 'react-icons/gi';
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
      <input type="text" placeholder="Buscar por referencia" />
      <Link to="/hallazgo/nuevo">
        <button className="action-button"> + Nuevo</button>
      </Link>
    </>
  );
};

const Supply = ({ id, costName, costType, costValue, date }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{costName}</td>
      <td>{costType}</td>
      <td>{costValue}</td>
      <td>{format(new Date(date), 'MM/dd/yyyy')}</td>

      <td className="actions">
        <Link to={`/accesos`}>
          <button className="action-button">Modificar</button>
        </Link>
        <button className="action-button">Eliminar</button>
      </td>
    </tr>
  );
};

const ListaCostos = () => {
  const columns = [
    'Ref',
    'Nombre Costo',
    'Tipo de Costo',
    'Valor',
    'Fecha de Pago',
    '',
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.listCosts();
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
      <Headers title="Lista de Costos" icon={<GiTwoCoins />} />
      <Container>
        <QueryBar />
        <Table columns={columns}>
          {data.map(({ id, costName, costType, costValue, date }) => {
            return (
              <Supply
                key={id}
                id={id}
                costName={costName}
                costType={costType}
                costValue={costValue}
                date={date}
              />
            );
          })}
        </Table>
      </Container>
    </>
  );
};

export default ListaCostos;
