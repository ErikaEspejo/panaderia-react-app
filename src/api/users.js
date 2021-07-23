import http from '../utils/http';
/* import { format } from 'date-fns';
import { es } from 'date-fns/locale'; */

/* function formatUser(user) {
  const dateCreatedAt = `${format(new Date(user.createdAt), 'MMMM', {
    locale: es,
  })} de ${format(new Date(user.createdAt), 'yyyy')}`;

  return {
    ...user,
    id: user._id,
    dateCreatedAt,
  };
} */

export async function login({ username = '', password = '' }) {
  const response = await http.post(`/users/login`, {
    username,
    password,
  });
  const { data, message } = response.data;

  if (message === 'ok') {
    return Promise.resolve(data);
  } else {
    return Promise.reject(message);
  }
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
