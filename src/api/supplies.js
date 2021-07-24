import http from '../utils/http';

export async function listSupplies() {
  const response = await http.get(`/supplies`);
  const { data } = response.data;
  return data;
}

export async function getSupply({ id }) {
  const response = await http.get(`/supplies/${id}`);
  const { data } = response.data;
  return data;
}

export async function updateSupply({
  supply_id,
  name,
  type,
  quantity,
  units,
  ProviderId,
  totalCost,
}) {
  return await http.put(`/supplies/${supply_id}`, {
    name,
    type,
    quantity,
    units,
    ProviderId,
    totalCost,
  });
}

export async function createSupply({
  date,
  name,
  type,
  quantity,
  units,
  ProviderId,
  totalCost,
}) {
  await http.post(`/supplies`, {
    date,
    name,
    type,
    quantity,
    units,
    ProviderId,
    totalCost,
  });
}
