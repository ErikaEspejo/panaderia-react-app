import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';
import './styles/cost.css';

import Headers from '../components/Headers';
import Container from '../containers/Container';
import Modal from '../containers/Modal';
import NuevoTipo from './NuevoTipo';

const NuevoCosto = () => {
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
      const data = await API.listCostTypes();
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
          <div className="cost-data">
            <label htmlFor="">
              Fecha de Pago
              <input
                type="date"
                name="date"
                defaultValue={new Date(Date.now())
                  .toISOString()
                  .substring(0, 10)}
              />
            </label>
            <label htmlFor="">
              Nombre de Costo
              <input type="text" name="costName" />
            </label>
            <label htmlFor="">
              Tipo de costo
              <select name="costType">
                {data.map((el, index) => {
                  return <option key={index}>{el.type}</option>;
                })}
              </select>
              <button className="action-button" onClick={handleNewType}>
                Nuevo
              </button>
              <Modal
                show={show}
                children={
                  <NuevoTipo
                    tipo="Costo"
                    action={API.createCostTypes}
                    show={show}
                    onClose={() => setShow(false)}
                  />
                }
              />
            </label>
            <label htmlFor="">
              Valor de Costo
              <input type="number" step="0.01" name="costValue" />
            </label>
          </div>
          <div className="buttons">
            <button type="submit" className="action-button">
              {' '}
              <FaSave /> Guardar Costo
            </button>
            <button
              className="action-button"
              onClick={() => {
                history.push('/costos');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default NuevoCosto;
