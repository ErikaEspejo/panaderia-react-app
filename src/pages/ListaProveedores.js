import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPhoneAlt, FaUserAlt, FaAddressBook } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { BiWorld } from 'react-icons/bi';
import { format } from 'date-fns';

import Headers from '../components/Headers';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';
import EliminarProveedor from './EliminarProveedor';
import Modal from '../containers/Modal';

const QueryBar = () => {
  const history = useHistory();
  return (
    <>
      <input type="text" placeholder="Filtrar por nombre" />
      <input type="text" placeholder="Buscar por NIT" />

      <button
        className="action-button"
        onClick={() => {
          history.push('/produccion/proveedor/nuevo');
        }}
      >
        {' '}
        + Nuevo
      </button>
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
  const history = useHistory();
  const [show, setShow] = useState(false);
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
      <td>{address.replaceAll('/', ' - ')}</td>
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
        <button
          className="action-button"
          onClick={() => {
            history.push(`/produccion/proveedor/${id}`);
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
            <EliminarProveedor
              id={id}
              name={providerName}
              show={show}
              onClose={() => setShow(false)}
            />
          }
        />
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
          {data
            .map(
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
            )
            .sort()
            .reverse()}
        </Table>
      </Container>
    </>
  );
};

export default ListaProveedores;
