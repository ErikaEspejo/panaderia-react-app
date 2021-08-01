import http from '../utils/http';

export async function listOrders() {
  const response = await http.get(`/orders`);
  const { data } = response.data;

  return data;
}

export async function createOrder({ buyer, order, totalValue }) {
  await http.post(`/orders`, {
    buyer,
    order,
    totalValue,
  });
}
