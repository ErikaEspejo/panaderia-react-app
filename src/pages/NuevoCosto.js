import React, { useState } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

import Headers from '../components/Headers';
import Container from '../containers/Container';

const costTypes = ['Activos', 'Operativos'];

const NuevoCosto = () => {
  const history = useHistory();
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const { date, costName, costType, costValue } = event.target.elements;

    if (date.value && costName.value && costType.value && costValue.value) {
      const dateParsed = new Date(date.value).toLocaleDateString('en-US', {
        timeZone: 'Europe/Madrid',
      });

      try {
        setError('');
        await API.createCost({
          date: dateParsed,
          costName: costName.value,
          costType: costType.value,
          costValue: parseFloat(costValue.value),
        });

        history.push('/costos');
      } catch (error) {
        console.log(error);
        setError(
          'El costo no ha podido ser creado o se ha creado incorrectamente'
        );
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  return (
    <>
      <Headers title="Nuevo Costo" icon={<IoIosCreate />} />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <label htmlFor="">
            Fecha de Pago
            <input
              type="date"
              name="date"
              defaultValue={new Date(Date.now()).toISOString().substring(0, 10)}
            />
          </label>
          <label htmlFor="">
            Nombre de Costo
            <input type="text" name="costName" />
          </label>
          <label htmlFor="">
            Tipo de costo
            <select name="costType">
              {costTypes.map((el, index) => {
                return <option key={index}>{el}</option>;
              })}
            </select>
          </label>
          <button>Nuevo</button>
          <label htmlFor="">
            Valor de Costo
            <input type="number" step="0.01" name="costValue" />
          </label>

          <button type="submit">
            {' '}
            <FaSave /> Guardar Costo
          </button>
          <button
            onClick={() => {
              history.push('/costos');
            }}
          >
            Cancel
          </button>
        </form>
      </Container>
    </>
  );
};

export default NuevoCosto;
