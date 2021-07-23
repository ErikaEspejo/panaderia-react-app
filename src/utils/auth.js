const KEY = 'token';
const POSITION = 'position';

export function getSession() {
  return localStorage.getItem(KEY);
}

export function setSession({ data, position }) {
  localStorage.setItem(KEY, data);
  localStorage.setItem(POSITION, position);
}

export function clearSession() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(POSITION);
}

export function isAuthenticated() {
  const data = localStorage.getItem(KEY);
  return Boolean(data);
}

export function isAdmin() {
  const data = localStorage.getItem(POSITION);
  return Boolean(data);
}
