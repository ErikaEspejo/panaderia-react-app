import http from '../utils/http';

export async function listCosts() {
  const response = await http.get(`/costs`);
  const { data } = response.data;
  return data;
}

export async function getCost({ id }) {
  const response = await http.get(`/costs/${id}`);
  const { data } = response.data;
  return data;
}

export async function updateCost({ id, date, costName, costType, costValue }) {
  return await http.put(`/users/${id}`, {
    date,
    costName,
    costType,
    costValue,
  });
}

export async function createCost({ date, costName, costType, costValue }) {
  await http.post(`/costs`, {
    date,
    costName,
    costType,
    costValue,
  });
}

export async function removeCost({ id }) {
  return await http.delete(`/costs`, { data: { id } });
}
