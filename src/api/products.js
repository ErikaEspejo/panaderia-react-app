import http from '../utils/http';

export async function listProducts() {
  const response = await http.get(`/products`);
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
export async function createProduct({ product, cost, supplies, category }) {
  await http.post(`/products`, {
    product,
    cost,
    supplies,
    category,
    quantity: 0,
  });
}
