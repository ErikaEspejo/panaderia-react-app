import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';
import EliminarCosto from './EliminarCosto';
import Modal from '../containers/Modal';
import { format } from 'date-fns';
import EliminarPedido from './EliminarPedido';
import EmptyTable from '../components/EmptyTable';

const Sales = ({ order }) => {
  const history = useHistory();
  const [success, setSuccess] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  async function sendToBackend(event) {
    event.preventDefault();
    const arrayProducts = [];
    order.order.forEach((el) => {
      const string = `${el.product.id},${parseInt(el.quantity)},${el.cost},${
        el.costPerProduct
      }`;
      arrayProducts.push(string);
    });

    if (order.buyer.name && order.order && order.totalValue) {
      try {
        setError('');
        await API.createSale({
          buyer: order.buyer.name,
          order: arrayProducts.join(';'),
          totalValue: order.totalValue,
        });
        await API.removeOrder({
          id: order.id,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        console.log(error);
        setError(
          'El pedido no ha podido ser generado con exito o se ha generado incorrectamente'
        );
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.table}</td>
      <td>
        {order.waiter.idType} {order.waiter.identificationNumber} <br />
        {order.waiter.name} {order.waiter.lastName}
      </td>
      <td>{order.buyer.name}</td>
      <td>
        {order.order.map((el, index) => {
          return (
            <p>
              {el.quantity} - {el.product.name} - $ {el.cost}
            </p>
          );
        })}
      </td>
      <td>$ {order.totalValue}</td>
      <td>{format(new Date(order.createdAt), 'MM/dd/yyyy')}</td>
      <td className="actions">
        <button className="action-button" onClick={sendToBackend}>
          Terminar
        </button>

        <button className="action-button" onClick={() => setShow(true)}>
          Eliminar
        </button>
        <Modal
          show={show}
          children={
            <EliminarPedido
              show={show}
              onClose={() => setShow(false)}
              id={order.id}
              table={order.table}
            />
          }
        />
      </td>
    </tr>
  );
};

export default function PedidosActivos() {
  const columns = [
    'ID',
    'Mesa',
    'Mesero',
    'Comprador',
    'Orden',
    'Costo Total',
    'Fecha',
    '',
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.listOrders();
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

  return (
    <>
      <Container>
        <Table columns={columns}>
          <EmptyTable />
          {data
            .map((el, index) => {
              return <Sales key={index} order={el} />;
            })
            .sort()
            .reverse()}
        </Table>
      </Container>
    </>
  );
}
