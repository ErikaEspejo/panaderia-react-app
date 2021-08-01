import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useStore } from '../store/Store';
import { useHistory, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import { formatISO } from 'date-fns';
import useCosts from '../containers/useCosts';

import Headers from '../components/Headers';
import Container from '../containers/Container';
import Modal from '../containers/Modal';
import NuevoTipo from './NuevoTipo';

const ModificarCosto = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const { cost, date } = useCosts({ id });

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
        await API.updateCost({
          id,
          date: dateParsed,
          costName: costName.value,
          costType: costType.value,
          costValue: parseFloat(costValue.value),
        });

        history.push('/costos');
      } catch (error) {
        console.log(error);
        setError('El costo no ha podido ser modificado');
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  if (!cost) return null;

  return (
    <>
      <Headers
        title={`Modificar Costo - No. ${id} - "${cost.costName}"`}
        icon={<IoIosCreate />}
      />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <label htmlFor="">
            Fecha de Pago
            <input type="date" name="date" value={date} readOnly />
          </label>
          <label htmlFor="">
            Nombre de Costo
            <input type="text" name="costName" defaultValue={cost.costName} />
          </label>
          <label htmlFor="">
            Tipo de costo
            <select name="costType">
              <option selected disabled>
                {cost.costType}
              </option>
              {data.map((el, index) => {
                return <option key={index}>{el.type}</option>;
              })}
            </select>
          </label>
          <button onClick={handleNewType}>Nuevo</button>
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
          <label htmlFor="">
            Valor de Costo
            <input
              type="number"
              step="0.01"
              name="costValue"
              defaultValue={cost.costValue}
            />
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

export default ModificarCosto;
