import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

import Headers from '../components/Headers';
import Container from '../containers/Container';
import useWorker from '../containers/useWorker';

const ShowInfo = ({ identification, position, name, lastname }) => {
  const id = parseInt(identification);
  const { worker } = useWorker({ id });

  if (!worker) return null;
  const workerPosition = worker.position;
  const workerName = worker.firstName;
  const workerLastName = worker.lastName;
  position({ workerPosition });
  name({ workerName });
  lastname({ workerLastName });

  return (
    <p>
      Nombre del Trabajador: {worker.firstName} {worker.lastName}
    </p>
  );
};

const NuevoUsuario = (props) => {
  const history = useHistory();
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [identification, setIdentification] = useState('');
  const [success, setSuccess] = useState('');
  const [position, setPosition] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  async function loadWorkers() {
    try {
      const data = await API.listWorkers();
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    const { id, email, username, password, passwordConfirmation } =
      event.target.elements;

    const idType = id.value.substring(0, 2);
    const identificationNumber = id.value.substring(5);

    if (
      idType &&
      identificationNumber &&
      email.value &&
      username.value &&
      password.value &&
      passwordConfirmation.value
    ) {
      try {
        setError('');
        await API.createUser({
          idType,
          identificationNumber,
          name,
          lastName,
          username: username.value,
          position: position === 'Administrador' ? 'admin' : position,
          email: email.value,
          password: password.value,
          passwordConfirmation: passwordConfirmation.value,
        });

        setSuccess('El usuario ha sido creado con éxito');
        setTimeout(() => {
          window.location.reload();
        }, 200);
      } catch (error) {
        console.log(error);
        setError(
          'El usuario no ha podido ser creado o se ha creado incorrectamente'
        );
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  useEffect(() => {
    loadWorkers();
  }, []);

  return (
    <>
      <Headers title="Agregar Nuevo Usuario" icon={<IoIosCreate />} />
      {error && <Alert severity="error" message={error} />}
      {success && <Alert severity="success" message={success} />}
      <br />

      <form onSubmit={onSubmit} style={{ dsplay: 'flex' }}>
        <label htmlFor="">
          Documento de identidad
          <select
            name="id"
            onChange={(e) => {
              const identificacion = e.target.value.substring(5);
              setIdentification(identificacion);
            }}
          >
            <option selected disabled>
              Seleccione el usuario por su identificacion
            </option>
            {users.map((element, index) => {
              return (
                <option key={index}>
                  {element.idType} - {element.id}
                </option>
              );
            })}
          </select>
        </label>

        {identification ? (
          <ShowInfo
            identification={identification}
            position={({ workerPosition }) => setPosition(workerPosition)}
            name={({ workerName }) => setName(workerName)}
            lastname={({ workerLastName }) => setLastName(workerLastName)}
          />
        ) : null}

        <p>
          <label htmlFor="">
            Correo Electronico
            <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label htmlFor="">
            Usuario
            <input type="text" name="username" />
          </label>
        </p>
        <p>
          <label htmlFor="">
            Contraseña
            <input type="password" name="password" />
          </label>
        </p>
        <p>
          <label htmlFor="">
            Confirmar Contraseña
            <input type="password" name="passwordConfirmation" />
          </label>
        </p>

        <button type="submit">
          {' '}
          <FaSave /> Guardar Usuario
        </button>
        <button onClick={props.onClose}>Cancel</button>
      </form>
    </>
  );
};

export default NuevoUsuario;
