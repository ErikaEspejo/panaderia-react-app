import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaUsersCog, FaPhoneAlt, FaClipboardCheck } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Headers from '../components/Headers';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';
import EliminarInsumo from './EliminarInsumo';
import Modal from '../containers/Modal';

const QueryBar = () => {
  return (
    <>
      <input type="text" placeholder="Filtrar por nombre" />
      <input type="text" placeholder="Buscar por NIT" />
      <Link to="/produccion/insumo/nuevo">
        <button className="action-button"> + Nuevo</button>
      </Link>
    </>
  );
};

const Supply = ({
  supply_id,
  name,
  Provider,
  quantity,
  units,
  totalCost,
  type,
  createdAt,
}) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  return (
    <tr>
      <td>{supply_id}</td>
      <td>{name}</td>
      <td>
        <p>{Provider.providerName}</p>
        <p>
          {' '}
          <FaPhoneAlt className="table-icon" />
          {Provider.providerPhone}
        </p>
        <p>
          <BiWorld className="table-icon" />
          {Provider.providerWeb}
        </p>
      </td>
      <td>
        {quantity} {units}
      </td>
      <td>$ {totalCost}</td>
      <td>{type}</td>
      <td>{format(new Date(createdAt), 'MM/dd/yyyy')}</td>

      <td className="actions">
        <button
          className="action-button"
          onClick={() => {
            history.push(`/produccion/insumo/${supply_id}`);
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
            <EliminarInsumo
              id={supply_id}
              name={name}
              show={show}
              onClose={() => setShow(false)}
            />
          }
        />
      </td>
    </tr>
  );
};

const ListaInsumos = () => {
  const columns = [
    'Ref',
    'Nombre',
    'Proveedor',
    'Cantidad',
    'Costo Total',
    'Tipo',
    'Fecha de Compra',
    '',
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.listSupplies();
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
      <Headers title="Lista de Insumos" icon={<FaClipboardCheck />} />
      <Container>
        <QueryBar />
        <Table columns={columns}>
          {data
            .map(
              ({
                supply_id,
                name,
                Provider,
                quantity,
                units,
                totalCost,
                type,
                createdAt,
              }) => {
                return (
                  <Supply
                    key={supply_id}
                    supply_id={supply_id}
                    name={name}
                    Provider={Provider}
                    quantity={quantity}
                    units={units}
                    totalCost={totalCost}
                    type={type}
                    createdAt={createdAt}
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

export default ListaInsumos;
