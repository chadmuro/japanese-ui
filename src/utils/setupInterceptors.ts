import axios from 'axios';
import { config } from '../constants/config';

export const setupInterceptors = (history: any): void => {
  axios.interceptors.request.use(request => {
    const accessToken = localStorage.getItem('accessToken');
    request.baseURL = config.url.API_URL;
    request.headers['Content-Type'] = 'application/json';
    request.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return request;
  });

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const status = error.response.status;
      if (status === undefined || status === 403 || status === 401) {
        console.log(status);
        history.push('/login');
      }
      return Promise.reject(error);
    }
  );
};
