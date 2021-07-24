import http from '../utils/http';

export async function listSupplies() {
  const response = await http.get(`/supplies`);
  const { data } = response.data;
  return data;
}

/* export async function getUser({ id }) {
  const response = await http.get(`/users/${id}`);
  const { data } = response.data;
  //return formatUser(data);
}

export async function updateUser({
  idType,
  identificationNumber,
  name,
  lastName,
  username,
  state,
  email,
  password,
  position,
}) {
  return await http.put(`/users/${identificationNumber}`, {
    idType,
    name,
    lastName,
    username,
    state,
    email,
    password,
    position,
  });
}
*/
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
