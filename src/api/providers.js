import http from '../utils/http';

export async function listProviders() {
  const response = await http.get(`/providers`);
  const { data } = response.data;
  console.log(data);
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

export async function createUser({
  idType,
  identificationNumber,
  name,
  lastName,
  username,
  state,
  position,
  email,
  password,
}) {
  const response = await http.post(`/users`, {
    idType,
    identificationNumber,
    name,
    lastName,
    username,
    state,
    position,
    email,
    password,
  });
  const { data } = response.data;
  //return formatUser(data);
} */
