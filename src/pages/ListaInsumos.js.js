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
  return (
    <tr>
      <td>{supply_id}</td>
      <td>{name}</td>
      <td>
        <p>{Provider.providerName}</p>
        <p>
          {' '}
          <FaPhoneAlt />
          {Provider.providerPhone}
        </p>
        <p>
          <BiWorld />
          {Provider.providerWeb}
        </p>
      </td>
      <td>{quantity}</td>
      <td>{units}</td>
      <td>{totalCost}</td>
      <td>{type}</td>
      <td>{format(new Date(createdAt), 'MM/dd/yyyy')}</td>

      <td className="actions">
        <Link to={`/accesos`}>
          <button className="action-button">Modificar</button>
        </Link>
        <button className="action-button">Eliminar</button>
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
    'Unidad de Medida',
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
      <Headers title="Administrar Accesos" icon={<FaUsersCog />} />
      <Container>
        <QueryBar />
        <Table columns={columns}>
          {data.map(
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
          )}
        </Table>
      </Container>
    </>
  );
};

export default ListaInsumos;
