import http from '../utils/http';

export async function listWorkers() {
  const response = await http.get(`/workers`);
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
