import http from '../utils/http';

export async function listFindings() {
  const response = await http.get(`/quality`);
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
export async function createFinding({
  date,
  findingType,
  finding,
  actions,
  accomplishment,
}) {
  const response = await http.post(`/quality`, {
    date,
    findingType,
    finding,
    actions,
    accomplishment,
  });
  const { data } = response.data;
  return data;
}