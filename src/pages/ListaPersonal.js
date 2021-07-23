import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
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
      <Link to="/hallazgo/nuevo">
        <button className="action-button"> + Nuevo</button>
      </Link>
    </>
  );
};

const Supply = ({ worker }) => {
  return (
    <tr>
      <td>
        {worker.idType}
        <br />
        {worker.id}
      </td>
      <td>
        {worker.firstName} <br />
        {worker.lastName}
      </td>
      <td>{worker.position}</td>
      <td>{format(new Date(worker.entryDate), 'MM/dd/yyyy')}</td>
      <td>
        Horas Diurnas: {worker.totalDayHours} <br />
        Horas Diurnas Festivo: {worker.totalHolidayDayHours} <br />
        Horas Nocturnas: {worker.totalNightHours} <br />
        Horas Nocturnas Festivo: {worker.totalHolidayNightHours} <br />
      </td>
      <td>$ {worker.totalToSend}</td>
      <td>{format(new Date(worker.retreatDate), 'MM/dd/yyyy')}</td>
      <td>{worker.state}</td>
      <td className="actions">
        <Link to={`/accesos`}>
          <button className="action-button">Modificar</button>
        </Link>
        <button className="action-button">Eliminar</button>
      </td>
    </tr>
  );
};

const ListaPersonal = () => {
  const columns = [
    'Documento',
    'Nombres',
    'Cargo',
    'Fecha de ingreso',
    'Asignación',
    'Salario',
    'Fecha de Retiro',
    'Estado',
    '',
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.listWorkers();
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
      <Headers title="Personal" icon={<FaUsers />} />
      <Container>
        <QueryBar />
        <Table columns={columns}>
          {data.map((worker) => {
            return <Supply key={worker.id} worker={worker} />;
          })}
        </Table>
      </Container>
    </>
  );
};

export default ListaPersonal;