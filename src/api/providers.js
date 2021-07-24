import http from '../utils/http';

export async function listProviders() {
  const response = await http.get(`/providers`);
  const { data } = response.data;
  return data;
}

export async function getProvider({ id }) {
  const response = await http.get(`/providers/${id}`);
  const { data } = response.data;
  return data;
}

export async function updateProvider({
  id,
  nit,
  providerName,
  providerPhone,
  providerWeb,
  address,
  contactName,
  contactPhone,
  contactEmail,
  supplies,
}) {
  return await http.put(`/providers/${id}`, {
    nit,
    providerName,
    providerPhone,
    providerWeb,
    address,
    contactName,
    contactPhone,
    contactEmail,
    supplies,
  });
}

export async function createProvider({
  nit,
  providerName,
  providerPhone,
  providerWeb,
  address,
  contactName,
  contactPhone,
  contactEmail,
  supplies,
}) {
  await http.post(`/providers`, {
    nit,
    providerName,
    providerPhone,
    providerWeb,
    address,
    contactName,
    contactPhone,
    contactEmail,
    supplies,
  });
}

export async function removeProvider({ id }) {
  return await http.delete(`/providers`, { data: { id } });
}
