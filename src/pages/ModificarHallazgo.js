import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useStore } from '../store/Store';
import { useHistory, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import { formatISO } from 'date-fns';
import useFindings from '../containers/useFindings';

import Headers from '../components/Headers';
import Container from '../containers/Container';

const type = ['Tecnologico', 'Administrativo'];

const ModificarHallazgo = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const { finding, date } = useFindings({ id });
  async function onSubmit(event) {
    event.preventDefault();
    const { date, findingType, finding, actions, accomplishment } =
      event.target.elements;

    actions.value === '' && (actions.value = ' ');

    if (date.value && findingType.value && finding.value) {
      try {
        setError('');
        await API.updateFinding({
          id,
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

  if (!finding) return null;

  return (
    <>
      <Headers
        title={`Modificar Hallazgo - No. ${id}`}
        icon={<IoIosCreate />}
      />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="">
              Fecha
              <input type="date" name="date" value={date} readOnly />
            </label>
            <label htmlFor="">
              Tipo de hallazgo
              <input
                type="text"
                name="findingType"
                value={finding.findingType}
                readOnly
              ></input>
            </label>
          </div>
          <div>
            <label htmlFor="">
              Descripción del Hallazgo
              <textarea
                name="finding"
                cols="30"
                rows="10"
                defaultValue={finding.finding}
              ></textarea>
            </label>
            <label htmlFor="">
              Acciones Correctivas
              <textarea
                name="actions"
                cols="30"
                rows="10"
                defaultValue={finding.actions}
              ></textarea>
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
          <button
            onClick={() => {
              history.push('/hallazgo');
            }}
          >
            Cancel
          </button>
        </form>
      </Container>
    </>
  );
};

export default ModificarHallazgo;
