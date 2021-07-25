import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GiTwoCoins } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Headers from '../components/Headers';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';
import EliminarCosto from './EliminarCosto';
import Modal from '../containers/Modal';

const QueryBar = () => {
  return (
    <>
      <input type="text" placeholder="Filtrar por nombre" />
      <input type="text" placeholder="Buscar por referencia" />
      <Link to="/costos/nuevo">
        <button className="action-button"> + Nuevo</button>
      </Link>
    </>
  );
};

const Supply = ({ id, costName, costType, costValue, date }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  return (
    <tr>
      <td>{id}</td>
      <td>{costName}</td>
      <td>{costType}</td>
      <td>{costValue}</td>
      <td>{format(new Date(date), 'MM/dd/yyyy')}</td>

      <td className="actions">
        <button
          className="action-button"
          onClick={() => history.push(`/costos/${id}`)}
        >
          Modificar
        </button>

        <button className="action-button" onClick={() => setShow(true)}>
          Eliminar
        </button>
        <Modal
          show={show}
          children={
            <EliminarCosto
              id={id}
              name={costName}
              show={show}
              onClose={() => setShow(false)}
            />
          }
        />
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
          {data
            .map(({ id, costName, costType, costValue, date }) => {
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
            })
            .sort()
            .reverse()}
        </Table>
      </Container>
    </>
  );
};

export default ListaCostos;
