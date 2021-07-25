import http from '../utils/http';

export async function listProduction() {
  const response = await http.get(`/production`);
  const { data } = response.data;
  return data;
}

export async function createProduction({ date, production }) {
  await http.post(`/production`, {
    date,
    production,
  });
}

export async function removeProduction({ id }) {
  return await http.delete(`/production`, { data: { id } });
}
