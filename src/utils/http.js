import axios from 'axios';
import { BASE_URL } from '../const';
import { clearSession, getSession } from './auth';

const instance = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getSession();
    if (token) {
      // config.headers.Authorization = token;
      // return config;
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: token,
        },
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      clearSession();
      // TODO: Fix redirect
      document.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
