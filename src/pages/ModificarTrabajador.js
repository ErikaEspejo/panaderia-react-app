import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useStore } from '../store/Store';
import { useHistory, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import { formatISO } from 'date-fns';
import useWorker from '../containers/useWorker';

import Headers from '../components/Headers';
import Container from '../containers/Container';
import Modal from '../containers/Modal';
import NuevoTipo from './NuevoTipo';

import {
  salaryCalculation,
  companyContributions,
  workerContributions,
} from '../services/workerService';

const idTypes = ['RC', 'CC', 'TI', 'CE', 'PA'];

const results = (data) => {
  const workerSalary = salaryCalculation(
    data.salary,
    data.totalDayHours,
    data.totalNightHours,
    data.totalHolidayDayHours,
    data.totalHolidayNightHours
  );

  const companyPayments = companyContributions(workerSalary, data.risk);
  const workerPayments = workerContributions(workerSalary);
  return { workerSalary, companyPayments, workerPayments };
};

const SalaryResults = ({ data, info }) => {
  // console.log('data', data, 'info', info);
  const { workerSalary, companyPayments, workerPayments } = results(data);
  return (
    <>
      <h3>Pagos por parte de la compañía</h3>
      <p>Pago a Salud: {companyPayments.health}</p>
      <p>Pago a Pensión: {companyPayments.pension}</p>
      <p>Pago a ARL: {companyPayments.arl}</p>
      <p>Pago a Caja de Compensación: {companyPayments.compensation}</p>
      <p>
        Total de Pagos:{' '}
        {companyPayments.health +
          companyPayments.pension +
          companyPayments.arl +
          companyPayments.compensation}
      </p>

      <h3>Pagos por parte del empleado</h3>
      <p>Pago a Salud: {workerPayments.health}</p>
      <p>Pago a Pensión: {workerPayments.pension}</p>
      <p>Total de Pagos: {workerPayments.pension + workerPayments.health}</p>

      <h3>
        Salario Total:{' '}
        {workerSalary - (workerPayments.pension + workerPayments.health)}
      </h3>
    </>
  );
};

const ModificarTrabajador = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [input, setInput] = useState({});
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { worker, entryDate, retreatDate } = useWorker({ id });

  let workerData = worker !== null ? worker : {};

  console.log(input);

  const calcularSalario = (event) => {
    event.preventDefault();
    setShow(true);
  };

  const handleNewType = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  async function loadList() {
    try {
      const data = await API.listPositionTypes();
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
    setInput(workerData);
  }, [workerData]);

  async function onSubmit(event) {
    event.preventDefault();
    const {
      idType,
      id,
      firstName,
      lastName,
      position,
      entryDate,
      retreatDate,
      state,
      totalDayHours,
      totalNightHours,
      totalHolidayDayHours,
      totalHolidayNightHours,
      salary,
      risk,
    } = event.target.elements;

    if (
      firstName.value &&
      lastName.value &&
      position.value &&
      entryDate.value &&
      state.value &&
      salary.value &&
      risk.value
    ) {
      try {
        const { workerSalary } = results(input);
        setError('');
        await API.updateWorker({
          idType: idType.value,
          id: id.value,
          firstName: firstName.value,
          lastName: lastName.value,
          position:
            position.value === 'Administrador' ? 'admin' : position.value,
          entryDate: entryDate.value,
          retreatDate: retreatDate.value || '10-10-2999',
          state: state.value,
          totalDayHours: input.totalDayHours || worker.totalDayHours,
          totalNightHours: input.totalNightHours || worker.totalNightHours,
          totalHolidayDayHours:
            input.totalHolidayDayHours || worker.totalHolidayDayHours,
          totalHolidayNightHours:
            input.totalHolidayNightHours || worker.totalHolidayNightHours,
          salary: workerSalary || worker.salary,
          risk: risk.value || worker.risk,
        });

        history.push('/personal');
      } catch (error) {
        console.log(error);
        setError('El trabajador no ha podido ser modificado');
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  if (!worker) return null;

  return (
    <>
      <Headers
        title={`Modificar Trabajador - ${worker.idType}: ${id} - ${worker.firstName} ${worker.lastName}`}
        icon={<IoIosCreate />}
      />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <label htmlFor="">
            Nombres
            <input
              type="text"
              name="firstName"
              defaultValue={worker.firstName}
            />
          </label>
          <label htmlFor="">
            Apellidos
            <input type="text" name="lastName" defaultValue={worker.lastName} />
          </label>
          <label htmlFor="">
            Identificación
            <select name="idType">
              <option selected disabled>
                {worker.idType}
              </option>
              {idTypes.map((el, index) => {
                return <option key={index}>{el}</option>;
              })}
            </select>
            <input type="text" name="id" defaultValue={worker.id} />
          </label>
          <label htmlFor="">
            Cargo
            <select name="position">
              <option selected disabled>
                {worker.position === 'admin'
                  ? 'Administrador'
                  : worker.position}
              </option>
              {data.map((el, index) => {
                return <option key={index}>{el.type}</option>;
              })}
            </select>
          </label>
          <button onClick={handleNewType}>Nuevo</button>
          <Modal
            show={showModal}
            children={
              <NuevoTipo
                tipo="Cargo"
                action={API.createPositionTypes}
                show={showModal}
                onClose={() => setShowModal(false)}
              />
            }
          />
          <label htmlFor="">
            Fecha de Ingreso
            <input type="date" name="entryDate" defaultValue={entryDate} />
          </label>

          <label htmlFor="">
            Fecha de Retiro
            <input type="date" name="retreatDate" defaultValue={retreatDate} />
          </label>
          <label htmlFor="">
            Estado
            <input type="radio" name="state" value="active" id="active" />
            <label htmlFor="active">Activo</label>
            <input type="radio" name="state" value="inactive" id="inactive" />
            <label htmlFor="inactive">Inactivo</label>
          </label>

          <hr />
          <h3>Horas asignadas</h3>
          <label htmlFor="">
            No. Horas Diurnas
            <input
              type="number"
              name="totalDayHours"
              onChange={(e) =>
                setInput({ ...input, totalDayHours: parseInt(e.target.value) })
              }
              defaultValue={worker.totalDayHours}
              min="0"
            />
          </label>
          <label htmlFor="">
            No. Horas Diurnas Festivas
            <input
              type="number"
              name="totalHolidayDayHours"
              value={input.totalHolidayDayHours}
              onChange={(e) =>
                setInput({
                  ...input,
                  totalHolidayDayHours: parseInt(e.target.value),
                })
              }
              defaultValue={worker.totalHolidayDayHours}
              min="0"
            />
          </label>
          <label htmlFor="">
            No. Horas Nocturnas
            <input
              type="number"
              name="totalNightHours"
              value={input.totalNightHours}
              onChange={(e) =>
                setInput({
                  ...input,
                  totalNightHours: parseInt(e.target.value),
                })
              }
              defaultValue={worker.totalNightHours}
              min="0"
            />
          </label>
          <label htmlFor="">
            No. Horas Nocturnas Festivas
            <input
              type="number"
              name="totalHolidayNightHours"
              value={input.totalHolidayNightHours}
              onChange={(e) =>
                setInput({
                  ...input,
                  totalHolidayNightHours: parseInt(e.target.value),
                })
              }
              defaultValue={worker.totalHolidayNightHours}
              min="0"
            />
          </label>
          <label htmlFor="">
            Salario
            <input
              type="number"
              name="salary"
              step="0.01"
              defaultValue={worker.salary}
              value={input.salary}
              onChange={(e) =>
                setInput({ ...input, salary: parseFloat(e.target.value) })
              }
              min="0"
            />
          </label>

          <hr />
          <label htmlFor="">
            Riesgo
            <input
              type="number"
              name="risk"
              value={input.risk}
              onChange={(e) => {
                setInput({ ...input, risk: parseInt(e.target.value) });
              }}
              defaultValue={worker.risk}
              max="5"
              min="1"
            />
          </label>
          <button onClick={calcularSalario}>Calcular Salario</button>

          <br />

          {show ? <SalaryResults data={input} /> : null}

          <button type="submit">
            {' '}
            <FaSave /> Guardar Trabajador
          </button>
          <button
            onClick={() => {
              history.push('/personal');
            }}
          >
            Cancel
          </button>
        </form>
      </Container>
    </>
  );
};

export default ModificarTrabajador;
