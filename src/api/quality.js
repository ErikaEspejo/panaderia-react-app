import http from '../utils/http';

export async function listFindings() {
  const response = await http.get(`/quality`);
  const { data } = response.data;
  return data;
}

export async function getFinding({ id }) {
  const response = await http.get(`/quality/${id}`);
  const { data } = response.data;

  return data;
}

export async function updateFinding({
  id,
  findingType,
  finding,
  actions,
  accomplishment,
}) {
  return await http.put(`/quality/${id}`, {
    findingType,
    finding,
    actions,
    accomplishment,
  });
}

export async function removeFinding({ id }) {
  return await http.delete(`/quality`, { data: { id } });
}

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
