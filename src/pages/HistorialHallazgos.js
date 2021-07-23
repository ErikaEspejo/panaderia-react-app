import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { BiListCheck } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Headers from '../components/Headers';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';

const QueryBar = () => {
  return (
    <>
      <input type="text" placeholder="Filtrar por tipo de hallazgo" />
      <input type="text" placeholder="Buscar por ID" />
      <Link to="/hallazgo/nuevo">
        <button className="action-button"> + Nuevo</button>
      </Link>
    </>
  );
};

const Provider = ({
  id,
  date,
  findingType,
  finding,
  actions,
  accomplishment,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{format(new Date(date), 'MM/dd/yyyy')}</td>
      <td>{findingType}</td>
      <td>{finding}</td>
      <td>{actions}</td>
      <td>
        <input type="checkbox" checked={accomplishment} disabled />
      </td>

      <td className="actions">
        <Link to={`/accesos`}>
          <button className="action-button">Modificar</button>
        </Link>
        <button className="action-button">Eliminar</button>
      </td>
    </tr>
  );
};

const ListaProveedores = () => {
  const columns = [
    'ID',
    'Fecha',
    'Tipo de Hallazgo',
    'Hallazgo',
    'Acciones Correctivas',
    'Cumpl.',
    '',
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.listFindings();
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
      <Headers title="Historial de Hallazgos" icon={<BiListCheck />} />
      <Container>
        <QueryBar />
        <Table columns={columns}>
          {data.map(
            ({ id, date, findingType, finding, actions, accomplishment }) => {
              return (
                <Provider
                  key={id}
                  id={id}
                  date={date}
                  findingType={findingType}
                  finding={finding}
                  actions={actions}
                  accomplishment={accomplishment}
                />
              );
            }
          )}
        </Table>
      </Container>
    </>
  );
};

export default ListaProveedores;
