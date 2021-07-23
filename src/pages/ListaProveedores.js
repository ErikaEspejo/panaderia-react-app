import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FaUsersCog,
  FaPhoneAlt,
  FaUserAlt,
  FaAddressBook,
} from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
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

const Provider = ({
  id,
  nit,
  providerName,
  providerPhone,
  providerWeb,
  address,
  contactEmail,
  contactName,
  contactPhone,
  supplies,
  createdAt,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{nit}</td>
      <td>
        <p>{providerName}</p>
        <p>
          {' '}
          <FaPhoneAlt />
          {providerPhone}
        </p>
        <p>
          <BiWorld />
          {providerWeb}
        </p>
      </td>
      <td>{address}</td>
      <td>
        <p>
          <FaUserAlt />
          {contactName}
        </p>
        <p>
          <HiMail />
          {contactEmail}
        </p>
        <p>
          <FaPhoneAlt />
          {contactPhone}
        </p>
      </td>
      <td>{supplies}</td>
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

const ListaProveedores = () => {
  const columns = [
    'ID',
    'NIT',
    'Proveedor',
    'Dirección',
    'Contacto',
    'Insumos',
    'Agregado',
    '',
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.listProviders();
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
      <Headers title="Lista de Proveedores" icon={<FaAddressBook />} />
      <Container>
        <QueryBar />
        <Table columns={columns}>
          {data.map(
            ({
              id,
              nit,
              providerName,
              providerPhone,
              providerWeb,
              email,
              address,
              contactEmail,
              contactName,
              contactPhone,
              supplies,
              createdAt,
            }) => {
              return (
                <Provider
                  key={id}
                  id={id}
                  nit={nit}
                  providerName={providerName}
                  providerPhone={providerPhone}
                  providerWeb={providerWeb}
                  email={email}
                  address={address}
                  contactEmail={contactEmail}
                  contactName={contactName}
                  contactPhone={contactPhone}
                  supplies={supplies}
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

export default ListaProveedores;
