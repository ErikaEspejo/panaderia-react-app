import React, { useState } from 'react';
import FormNuevoPedido from '../components/FormNuevoPedido';
import Modal from '../containers/Modal';
import './styles/pedido.css';

const Tables = ({ number }) => {
  const [index, setIndex] = useState('');
  const [show, setShow] = useState(false);

  return (
    <ul className="table-list">
      {[...Array(number)].map((e, i) => {
        return (
          <>
            <li
              className="table-name"
              key={i + 1}
              onClick={() => {
                setIndex(i + 1);
                setShow(true);
              }}
            >
              Mesa No. {i + 1}
            </li>
            <Modal
              show={show}
              children={
                <FormNuevoPedido
                  id={index}
                  show={show}
                  onClose={() => setShow(false)}
                />
              }
            />
          </>
        );
      })}
    </ul>
  );
};

export default function NuevoPedido() {
  return <Tables number={20} />;
}
