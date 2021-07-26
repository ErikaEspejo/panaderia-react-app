import http from '../utils/http';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

export async function listUsers() {
  const response = await http.get(`/users/`);
  const { data } = response.data;
  return data;
}

export async function getUser({ id }) {
  const response = await http.get(`/users/${id}`);
  const { data } = response.data;
  return data;
}

export async function updateUser({
  idType,
  identificationNumber,
  name,
  lastName,
  email,
  username,
  password,
  position,
}) {
  return await http.put(`/users/${identificationNumber}`, {
    idType,
    name,
    lastName,
    email,
    username,
    password,
    position,
  });
}

export async function createUser({
  idType,
  identificationNumber,
  username,
  email,
  name,
  lastName,
  position,
  password,
  passwordConfirmation,
}) {
  await http.post(`/users`, {
    idType,
    identificationNumber,
    username,
    email,
    name,
    lastName,
    position,
    password,
    passwordConfirmation,
  });
}
