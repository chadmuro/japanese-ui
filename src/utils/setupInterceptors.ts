import axios from 'axios';
import { config } from '../constants/config';
import store from '../store/store';
import { logout } from '../store/slices/userSlice';

export const setupInterceptors = (history: any): void => {
  axios.interceptors.request.use(request => {
    const accessToken = localStorage.getItem('accessToken');
    request.baseURL = config.url.API_URL;
    request.headers['Content-Type'] = 'application/json';
    if (accessToken) {
      request.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  });

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const status = error.response.status;
      if (status === undefined || status === 403 || status === 401) {
        store.dispatch(logout());
        history.push('/login');
      }
      return Promise.reject(error);
    }
  );
};
