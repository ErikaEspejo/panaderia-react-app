import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

import Modal from '../containers/Modal';
import NuevoTipo from './NuevoTipo';

import Headers from '../components/Headers';
import Container from '../containers/Container';
import './styles/styles.css';

const NuevoHallazgo = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const handleNewType = (e) => {
    e.preventDefault();
    setShow(true);
  };

  async function loadList() {
    try {
      const data = await API.listFindingTypes();
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

  async function onSubmit(event) {
    event.preventDefault();
    const { date, findingType, finding, actions, accomplishment } =
      event.target.elements;

    actions.value === '' && (actions.value = ' ');

    if (date.value && findingType.value && finding.value) {
      const dateParsed = new Date(date.value).toLocaleDateString('en-US', {
        timeZone: 'Europe/Madrid',
      });

      try {
        setError('');
        await API.createFinding({
          date: dateParsed,
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
        <form onSubmit={onSubmit} className="form-modify-finding">
          <div>
            <label htmlFor="">
              Fecha
              <input
                type="date"
                name="date"
                defaultValue={new Date(Date.now())
                  .toISOString()
                  .substring(0, 10)}
              />
            </label>
            <label htmlFor="">
              Tipo de hallazgo
              <select name="findingType" className="select-button">
                {data.map((el, index) => {
                  return <option key={index}>{el.type}</option>;
                })}
              </select>
            </label>
            <button onClick={handleNewType} className="action-button">
              Nuevo
            </button>
            <Modal
              show={show}
              children={
                <NuevoTipo
                  tipo="Hallazgo"
                  action={API.createFindingTypes}
                  show={show}
                  onClose={() => setShow(false)}
                />
              }
            />
          </div>
          <div className="finding-actions">
            <label htmlFor="">
              Descripci??n del Hallazgo <br />
              <textarea name="finding" cols="30" rows="10"></textarea>
            </label>
            <label htmlFor="">
              Acciones Correctivas <br />
              <textarea name="actions" cols="30" rows="10"></textarea>
            </label>
            <label htmlFor="">
              Cumplimiento <br />
              <input type="checkbox" name="accomplishment" />
            </label>
          </div>
          <div className="buttons">
            <button type="submit" className="action-button">
              {' '}
              <FaSave /> Guardar Hallazgo
            </button>
            <button
              onClick={() => {
                history.push('/hallazgo');
              }}
              className="action-button"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default NuevoHallazgo;
