import http from '../utils/http';

export async function listFindingTypes() {
  const response = await http.get(`/others/findings`);
  const { data } = response.data;

  return data;
}

export async function createFindingTypes({ type }) {
  await http.post(`/others/findings`, {
    type,
  });
}
export async function listCostTypes() {
  const response = await http.get(`/others/costs`);
  const { data } = response.data;

  return data;
}

export async function createCostTypes({ type }) {
  await http.post(`/others/costs`, {
    type,
  });
}
export async function listPositionTypes() {
  const response = await http.get(`/others/position`);
  const { data } = response.data;

  return data;
}

export async function createPositionTypes({ type }) {
  await http.post(`/others/position`, {
    type,
  });
}
export async function listSupplyTypes() {
  const response = await http.get(`/others/supply`);
  const { data } = response.data;

  return data;
}

export async function createSupplyTypes({ type }) {
  await http.post(`/others/supply`, {
    type,
  });
}
