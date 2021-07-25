import http from '../utils/http';

export async function listCosts() {
  const response = await http.get(`/costs`);
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
export async function createCost({ date, costName, costType, costValue }) {
  await http.post(`/costs`, {
    date,
    costName,
    costType,
    costValue,
  });
}
