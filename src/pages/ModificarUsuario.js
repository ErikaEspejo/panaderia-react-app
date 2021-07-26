import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useStore } from '../store/Store';
import { useHistory, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import { formatISO } from 'date-fns';
import useWorker from '../containers/useWorker';
import useUsers from '../containers/useUsers';

import Headers from '../components/Headers';
import Container from '../containers/Container';

const ModificarUsuario = (props) => {
  const id = props.id;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [position, setPosition] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const { user } = useUsers({ id });

  async function onSubmit(event) {
    event.preventDefault();
    const { email, username, password } = event.target.elements;

    if (email.value && username.value && password.value) {
      try {
        setError('');
        await API.updateUser({
          idType: user.idType,
          identificationNumber: user.identificationNumber,
          name: user.name,
          lastName: user.lastname,
          email: email.value,
          username: username.value,
          password: password.value,
          position: user.position,
        });

        setSuccess('El usuario ha sido actualizado con éxito');
        setTimeout(() => {
          window.location.reload();
        }, 200);
      } catch (error) {
        console.log(error);
        setError('El usuario no ha podido ser actualizado');
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  if (!user) return null;

  return (
    <>
      <Headers title="Modificar Usuario" icon={<IoIosCreate />} />
      {error && <Alert severity="error" message={error} />}
      {success && <Alert severity="success" message={success} />}
      <br />

      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor="">
          Documento de identidad
          <input type="text" name="id" value={user.identificationNumber} />
        </label>
        <label htmlFor="">
          Nombre del Trabajador
          <input
            type="text"
            name="id"
            value={`${user.name} ${user.lastname}`}
          />
        </label>

        <label htmlFor="">
          Correo Electronico
          <input type="email" name="email" defaultValue={user.email} />
        </label>

        <label htmlFor="">
          Usuario
          <input type="text" name="username" defaultValue={user.username} />
        </label>

        <label htmlFor="">
          Contraseña
          <input type="password" name="password" />
        </label>

        <button type="submit">
          {' '}
          <FaSave /> Guardar Usuario
        </button>
        <button onClick={props.onClose}>Cancel</button>
      </form>
    </>
  );
};

export default ModificarUsuario;
