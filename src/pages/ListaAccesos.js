import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaUsersCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Headers from '../components/Headers';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';
import NuevoUsuario from './NuevoUsuario';
import ModificarUsuario from './ModificarUsuario';
import EliminarUsuario from './EliminarUsuario';
import Modal from '../containers/Modal';

const QueryBar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      {/*<input type="text" placeholder="Filtrar por nombre" />
      <input type="text" placeholder="Buscar por ID" />*/}
      <button className="action-button" onClick={() => setShow(true)}>
        + Nuevo
      </button>
      <Modal
        show={show}
        children={<NuevoUsuario show={show} onClose={() => setShow(false)} />}
      />
    </>
  );
};

const User = ({ id, idType, name, lastname, user, email, position, state }) => {
  const [modify, setModify] = useState(false);
  const [remove, setRemove] = useState(false);
  return (
    <tr>
      <td>{idType}</td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{lastname}</td>
      <td>{user}</td>
      <td>{email}</td>
      <td>{position}</td>
      <td>{position === 'admin' ? 'Portal Administrativo' : 'Ventas'}</td>
      <td>{state}</td>
      <td className="actions">
        <button className="action-button" onClick={() => setModify(true)}>
          Modificar
        </button>
        <Modal
          show={modify}
          children={
            <ModificarUsuario
              show={modify}
              id={id}
              onClose={() => setModify(false)}
            />
          }
        />
        <button className="action-button" onClick={() => setRemove(true)}>
          Eliminar
        </button>
        <Modal
          show={remove}
          children={
            <EliminarUsuario
              id={id}
              name={name}
              lastname={lastname}
              show={remove}
              onClose={() => setRemove(false)}
            />
          }
        />
      </td>
    </tr>
  );
};

const ListaAccesos = () => {
  const columns = [
    'Tipo',
    'ID',
    'Nombre',
    'Apellido',
    'Usuario',
    'Email',
    'Cargo',
    'Accesos',
    'Estado',
    '',
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.listUsers();
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
              identificationNumber,
              idType,
              name,
              lastname,
              username,
              email,
              position,
              state,
            }) => {
              return (
                <User
                  key={identificationNumber}
                  id={identificationNumber}
                  idType={idType}
                  name={name}
                  lastname={lastname}
                  email={email}
                  user={username}
                  position={position}
                  state={state}
                />
              );
            }
          )}
        </Table>
      </Container>
    </>
  );
};

export default ListaAccesos;
