import http from '../utils/http';

export async function listSales() {
  const response = await http.get(`/sales`);
  const { data } = response.data;
  return data;
}

export async function createSale({ buyer, order, totalValue }) {
  await http.post(`/sales`, {
    buyer,
    order,
    totalValue,
  });
}
