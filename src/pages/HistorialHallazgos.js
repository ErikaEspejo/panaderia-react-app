import React from 'react';
import { FaListUl } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Headers from '../components/Headers';
import Container from '../containers/Container';
import Table from '../containers/Table';

const data = [
  {
    id: 2,
    date: '2021-05-12T05:00:00.000Z',
    findingType: 'Tecnológico',
    finding: 'El horno esta generando problemas electricos',
    actions: 'Asistencia tecnica, arreglo de componentes',
    accomplishment: true,
    createdAt: '2021-07-05T21:18:00.000Z',
    updatedAt: '2021-07-05T21:18:32.000Z',
  },
  {
    id: 4,
    date: '2021-05-12T05:00:00.000Z',
    findingType: 'Tecnológico',
    finding: 'El horno esta generando problemas electricos',
    actions: 'Asistencia tecnica',
    accomplishment: false,
    createdAt: '2021-07-05T21:18:03.000Z',
    updatedAt: '2021-07-05T21:18:03.000Z',
  },
];

const QueryBar = () => {
  return (
    <>
      <label>
        Filtrar por Fecha
        <input type="date" />
      </label>
      <input type="text" placeholder="Filtrar por tipo de hallazgo" />
      <input type="text" placeholder="Buscar por Numero" />
      <Link to="/hallazgo/nuevo">
        <button className="action-button">Nuevo</button>
      </Link>
    </>
  );
};

const TableContent = () => {
  const content = data.map((el, index) => {
    return (
      <tr key={index}>
        <td>{el.id}</td>
        <td>{format(new Date(el.createdAt), 'MM/dd/yyyy')}</td>
        <td>{el.findingType}</td>
        <td>{el.finding}</td>
        <td>{el.actions}</td>
        <td>
          <input type="checkbox" checked={el.accomplishment} disabled />
        </td>
        <td className="actions">
          <Link to={`/hallazgo/modificar/${el.id}`}>
            <button className="action-button">Modificar</button>
          </Link>
          <button className="action-button">Eliminar</button>
        </td>
      </tr>
    );
  });
  return content;
};

const HistorialHallazgos = () => {
  const columns = [
    'No. Hallazgo',
    'Fecha',
    'Tipo de Hallazgo',
    'Hallazgo',
    'Acciones Correctivas',
    'Cumpl.',
    '',
  ];

  return (
    <>
      <Headers title="Historial de Hallazgos" icon={<FaListUl />} />
      <Container>
        <QueryBar />
        <Table columns={columns}>
          <TableContent />
        </Table>
      </Container>
    </>
  );
};

export default HistorialHallazgos;
