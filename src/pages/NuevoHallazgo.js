import React, { useState } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

import Headers from '../components/Headers';
import Container from '../containers/Container';

const data = ['Tecnologico', 'Administrativo'];

const NuevoHallazgo = () => {
  const history = useHistory();
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const { date, findingType, finding, actions, accomplishment } =
      event.target.elements;

    if (date.value && findingType.value && finding.value) {
      try {
        setError('');
        await API.createFinding({
          date: date.value,
          findingType: findingType.value,
          finding: finding.value,
          actions: actions.value,
          accomplishment: accomplishment.checked,
        });
        date.value = '';
        finding.value = '';
        findingType.value = '';
        actions.value = '';
        accomplishment.checked = false;
        history.push('/hallazgo');
      } catch (error) {
        console.log(error);
        setError(
          'El hallazgo no ha podido ser creado o se ha creado incorrectamente'
        );
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  return (
    <>
      <Headers title="Nuevo Hallazgo" icon={<IoIosCreate />} />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="">
              Fecha
              <input type="date" name="date" />
            </label>
            <label htmlFor="">
              Tipo de hallazgo
              <select name="findingType">
                {data.map((el, index) => {
                  return <option key={index}>{el}</option>;
                })}
              </select>
            </label>
            <button>Nuevo</button>
          </div>
          <div>
            <label htmlFor="">
              Descripción del Hallazgo
              <textarea name="finding" cols="30" rows="10"></textarea>
            </label>
            <label htmlFor="">
              Acciones Correctivas
              <textarea name="actions" cols="30" rows="10"></textarea>
            </label>
            <label htmlFor="">
              Cumplimiento
              <input type="checkbox" name="accomplishment" />
            </label>
          </div>
          <button type="submit">
            {' '}
            <FaSave /> Guardar Hallazgo
          </button>
        </form>
      </Container>
    </>
  );
};

export default NuevoHallazgo;
