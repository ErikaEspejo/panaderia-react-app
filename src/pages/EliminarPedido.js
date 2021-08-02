import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ImWarning } from 'react-icons/im';
import Alert from '../components/Alert';
import API from '../api';

export default function EliminarPedido(props) {
  const history = useHistory();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function eliminarPedido() {
    try {
      await API.removeOrder({
        id: props.id,
      });
      setSuccess('El pedido ha sido eliminado con éxito');
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (error) {
      console.log(error);
      setError('El pedido no ha podido ser eliminado correctamente');
    }
  }

  return (
    <>
      {success && <Alert severity="success" message={success} />}
      {error && <Alert severity="error" message={error} />}
      <br />
      <ImWarning style={{ color: 'orange', fontSize: '30px' }} />
      <p>
        ¿Está seguro de eliminar el pedido No. {props.id} - Mesa No.{' '}
        {props.table}?
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={eliminarPedido} className="action-button">
          Aceptar
        </button>
        <button onClick={props.onClose} className="action-button">
          Cancelar
        </button>
      </div>
    </>
  );
}
