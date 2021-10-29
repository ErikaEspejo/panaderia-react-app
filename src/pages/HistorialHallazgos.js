import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { BiListCheck } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Headers from '../components/Headers';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';
import EliminarHallazgo from '../pages/EliminarHallazgo';
import Modal from '../containers/Modal';

const QueryBar = () => {
  const history = useHistory();
  return (
    <>
      <input
        type="text"
        placeholder="Filtrar por tipo de hallazgo"
        className="filter"
      />
      <input type="text" placeholder="Buscar por ID" />

      <button
        className="action-button"
        onClick={() => {
          history.push('/hallazgo/nuevo');
        }}
      >
        {' '}
        + Nuevo
      </button>
    </>
  );
};

const Finding = ({
  id,
  date,
  findingType,
  finding,
  actions,
  accomplishment,
}) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
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
        <button
          className="action-button"
          onClick={() => {
            history.push(`/hallazgo/${id}`);
          }}
        >
          Modificar
        </button>

        <button className="action-button" onClick={() => setShow(true)}>
          Eliminar
        </button>
        <Modal
          show={show}
          children={
            <EliminarHallazgo
              id={id}
              show={show}
              onClose={() => setShow(false)}
            />
          }
        />
      </td>
    </tr>
  );
};

const HistorialHallazgos = () => {
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
          {data
            .map(
              ({ id, date, findingType, finding, actions, accomplishment }) => {
                return (
                  <Finding
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
            )
            .sort()
            .reverse()}
        </Table>
      </Container>
    </>
  );
};

export default HistorialHallazgos;
