import http from '../utils/http';

export async function listWorkers() {
  const response = await http.get(`/workers`);
  const { data } = response.data;
  return data;
}

export async function getWorker({ id }) {
  const response = await http.get(`/workers/${id}`);
  const { data } = response.data;
  return data;
}

export async function updateWorker({
  idType,
  id,
  firstName,
  lastName,
  position,
  entryDate,
  retreatDate,
  state,
  totalDayHours,
  totalNightHours,
  totalHolidayDayHours,
  totalHolidayNightHours,
  salary,
  risk,
}) {
  return await http.put(`/workers/${id}`, {
    idType,
    id,
    firstName,
    lastName,
    position,
    entryDate,
    retreatDate,
    state,
    totalDayHours,
    totalNightHours,
    totalHolidayDayHours,
    totalHolidayNightHours,
    salary,
    risk,
  });
}

export async function createWorker({
  idType,
  id,
  firstName,
  lastName,
  position,
  entryDate,
  retreatDate,
  state,
  totalDayHours,
  totalNightHours,
  totalHolidayDayHours,
  totalHolidayNightHours,
  salary,
  /* healthContribution,
  pension, */
  risk,
  /*  arl,
  compensation,
  totalCompanyToPay,
  totalWorkerToPay,
  totalToSend, */
}) {
  await http.post(`/workers`, {
    idType,
    id,
    firstName,
    lastName,
    position,
    entryDate,
    retreatDate,
    state,
    totalDayHours,
    totalNightHours,
    totalHolidayDayHours,
    totalHolidayNightHours,
    salary,
    /* healthContribution,
      pension, */
    risk,
    /*  arl,
      compensation,
      totalCompanyToPay,
      totalWorkerToPay,
      totalToSend, */
  });
}

export async function removeWorker({ id }) {
  return await http.delete(`/workers`, { data: { id } });
}
