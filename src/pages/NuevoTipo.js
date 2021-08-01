import React, { useState } from 'react';
import Alert from '../components/Alert';

export default function NuevoTipo(props) {
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    if (type.value) {
      try {
        setError('');
        await props.action({
          type: type.value,
        });

        setSuccess(
          `El tipo de ${props.tipo.toLowerCase()} ha sido creado con éxito`
        );
        setTimeout(() => {
          window.location.reload();
        }, 200);
      } catch (error) {
        console.log(error);
        setError(
          `El tipo de ${props.tipo.toLowerCase()} no ha podido ser creado`
        );
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  };

  return (
    <div>
      {error && <Alert severity="error" message={error} />}
      {success && <Alert severity="success" message={success} />}
      <h3>Agregar Nuevo Tipo de {props.tipo}</h3>

      <input type="text" name="type" onChange={(e) => setType(e.target)} />
      <button type="submit" onClick={onSubmit}>
        Guardar Nuevo {props.tipo}
      </button>
      <button onClick={props.onClose}>Calcelar</button>
    </div>
  );
}
