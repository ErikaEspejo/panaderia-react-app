import React from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';

import Headers from '../components/Headers';
import Container from '../containers/Container';

const data = ['Tecnologico', 'Administrativo'];

const NuevoHallazgo = () => {
  return (
    <>
      <Headers title="Nuevo Hallazgo" icon={<IoIosCreate />} />
      <Container>
        <form action="">
          <div>
            <label htmlFor="">
              Fecha
              <input type="date" />
            </label>
            <label htmlFor="">
              Tipo de hallazgo
              <select name="" id="">
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
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </label>
            <label htmlFor="">
              Acciones Correctivas
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </label>
            <label htmlFor="">
              Cumplimiento
              <input type="checkbox" />
            </label>
          </div>

          <button>
            {' '}
            <FaSave /> Guardar Hallazgo
          </button>
        </form>
      </Container>
    </>
  );
};

export default NuevoHallazgo;
