import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { ImWarning } from 'react-icons/im';
import Alert from '../components/Alert';
import API from '../api';

export default function EliminarUsuario(props) {
  const history = useHistory();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function eliminarUsuario() {
    try {
      await API.removeUser({
        id: props.id,
      });
      setSuccess('El usuario ha sido eliminado con éxito');
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (error) {
      console.log(error);
      setError('El usuario no ha podido ser eliminado correctamente');
    }
  }

  return (
    <>
      {success && <Alert severity="success" message={success} />}
      {error && <Alert severity="error" message={error} />}
      <br />
      <ImWarning style={{ color: 'orange', fontSize: '30px' }} />
      <p>
        ¿Está seguro de eliminar el usuario "{props.name} {props.lastname}"?
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={eliminarUsuario} className="action-button">
          Aceptar
        </button>
        <button onClick={props.onClose} className="action-button">
          Cancelar
        </button>
      </div>
    </>
  );
}
