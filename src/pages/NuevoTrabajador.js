import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

import Headers from '../components/Headers';
import Container from '../containers/Container';
import {
  salaryCalculation,
  companyContributions,
  workerContributions,
} from '../services/workerService';

const idTypes = ['RC', 'CC', 'TI', 'CE', 'PA'];
const positions = ['Administrador', 'Pincero', 'Mesero', 'Contador'];

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

const SalaryResults = ({ data }) => {
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

const NuevoTrabajador = () => {
  const history = useHistory();

  const [error, setError] = useState('');
  const [input, setInput] = useState({});
  const [show, setShow] = useState(false);
  const calcularSalario = (event) => {
    event.preventDefault();
    setShow(true);
  };

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
      totalDayHours.value &&
      totalNightHours.value &&
      totalHolidayDayHours.value &&
      totalHolidayNightHours.value &&
      salary.value &&
      risk.value
    ) {
      const { workerSalary, companyPayments, workerPayments } = results(input);
      try {
        setError('');
        await API.createWorker({
          idType: idType.value,
          id: id.value,
          firstName: firstName.value,
          lastName: lastName.value,
          position:
            position.value === 'Administrador' ? 'admin' : position.value,
          entryDate: entryDate.value,
          retreatDate: retreatDate.value ? retreatDate.value : '10-10-2999',
          state: state.value,
          totalDayHours: input.totalDayHours,
          totalNightHours: input.totalNightHours,
          totalHolidayDayHours: input.totalHolidayDayHours,
          totalHolidayNightHours: input.totalHolidayNightHours,
          salary: workerSalary,
          /*   healthContribution: companyPayments.health,
          pension: companyPayments.pension,  */
          risk: risk.value,
          /*  arl: companyPayments.arl,
          compensation: companyPayments.compensation,
          totalCompanyToPay:
            companyPayments.health +
            companyPayments.pension +
            companyPayments.arl +
            companyPayments.compensation,
          totalWorkerToPay: workerPayments.pension + workerPayments.health,
          totalToSend:
            workerSalary - (workerPayments.pension + workerPayments.health), */
        });

        history.push('/personal');
      } catch (error) {
        console.log(error);
        setError(
          'El trabajador no ha podido ser creado o se ha creado incorrectamente'
        );
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  return (
    <>
      <Headers title="Nuevo Trabajador" icon={<IoIosCreate />} />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <label htmlFor="">
            Nombres
            <input type="text" name="firstName" />
          </label>
          <label htmlFor="">
            Apellidos
            <input type="text" name="lastName" />
          </label>
          <label htmlFor="">
            Identificación
            <select name="idType">
              <option selected disabled>
                Tipo
              </option>
              {idTypes.map((el, index) => {
                return <option key={index}>{el}</option>;
              })}
            </select>
            <input type="text" name="id" />
          </label>
          <label htmlFor="">
            Cargo
            <select name="position">
              <option selected disabled>
                Seleccione el cargo
              </option>
              {positions.map((el, index) => {
                return <option key={index}>{el}</option>;
              })}
            </select>
          </label>
          <button>Nuevo</button>
          <label htmlFor="">
            Fecha de Ingreso
            <input type="date" name="entryDate" />
          </label>

          <label htmlFor="">
            Fecha de Retiro
            <input type="date" name="retreatDate" />
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
              defaultValue="0"
              value={input.totalDayHours}
              onInput={(e) =>
                setInput({ ...input, totalDayHours: parseInt(e.target.value) })
              }
            />
          </label>
          <label htmlFor="">
            No. Horas Diurnas Festivas
            <input
              type="number"
              name="totalHolidayDayHours"
              defaultValue="0"
              value={input.totalHolidayDayHours}
              onInput={(e) =>
                setInput({
                  ...input,
                  totalHolidayDayHours: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label htmlFor="">
            No. Horas Nocturnas
            <input
              type="number"
              name="totalNightHours"
              defaultValue="0"
              value={input.totalNightHours}
              onInput={(e) =>
                setInput({
                  ...input,
                  totalNightHours: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label htmlFor="">
            No. Horas Nocturnas Festivas
            <input
              type="number"
              name="totalHolidayNightHours"
              defaultValue="0"
              value={input.totalHolidayNightHours}
              onInput={(e) =>
                setInput({
                  ...input,
                  totalHolidayNightHours: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label htmlFor="">
            Salario
            <input
              type="number"
              name="salary"
              step="0.01"
              defaultValue="0"
              value={input.salary}
              onInput={(e) =>
                setInput({ ...input, salary: parseFloat(e.target.value) })
              }
            />
          </label>

          <hr />
          <label htmlFor="">
            Riesgo
            <input
              type="number"
              name="risk"
              value={input.risk}
              onInput={(e) =>
                setInput({ ...input, risk: parseInt(e.target.value) })
              }
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

export default NuevoTrabajador;
