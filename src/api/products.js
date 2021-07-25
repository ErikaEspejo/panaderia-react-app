import http from '../utils/http';

export async function listProducts() {
  const response = await http.get(`/products`);
  const { data } = response.data;
  return data;
}

export async function getProduct({ id }) {
  const response = await http.get(`/products/${id}`);
  const { data } = response.data;
  return data;
}

export async function updateProduct({ id, product, cost, supplies, category }) {
  return await http.put(`/products/${id}`, {
    product,
    cost,
    supplies,
    category,
  });
}

export async function createProduct({ product, cost, supplies, category }) {
  await http.post(`/products`, {
    product,
    cost,
    supplies,
    category,
    quantity: 0,
  });
}

export async function removeProduct({ id }) {
  return await http.delete(`/products`, { data: { id } });
}
