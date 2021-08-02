import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GiShoppingBag } from 'react-icons/gi';
import { format } from 'date-fns';

import Headers from '../components/Headers';
import API from '../api';
import Container from '../containers/Container';
import Table from '../containers/Table';

const Sale = ({ id, buyer, order, totalValue, waiter, createdAt }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>
        {buyer.id} <br /> {buyer.name}{' '}
      </td>

      <td>
        {waiter.idType} - {waiter.identificationNumber} <br /> {waiter.name}{' '}
        {waiter.lastName}
      </td>
      <td>{format(new Date(createdAt), 'MM/dd/yyyy')}</td>
      <td>
        {order.map((el, index) => {
          return (
            <p key={index}>
              {el.quantity} - {el.product.name} - ${el.cost} - $
              {el.quantity * el.cost}
            </p>
          );
        })}
      </td>

      <td>$ {order.reduce((sum, el) => sum + el.quantity * el.cost, 0)}</td>
    </tr>
  );
};

const ListaVentas = () => {
  const columns = [
    'ID',
    'Comprador',
    'Mesero',
    'Fecha',
    'CP - P - VU - VTP',
    'Valor Venta',
  ];

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  async function loadList() {
    try {
      const data = await API.listSales();
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
          {data.map(({ id, buyer, order, totalValue, waiter, createdAt }) => {
            return (
              <Sale
                key={id}
                id={id}
                buyer={buyer}
                order={order}
                totalValue={totalValue}
                waiter={waiter}
                createdAt={createdAt}
              />
            );
          })}
        </Table>
      </Container>
    </>
  );
};

export default ListaVentas;
