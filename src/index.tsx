import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import { theme } from './styles/theme';
import store from './store/store';
import { Provider } from 'react-redux';
import { config } from './constants/config';
import reportWebVitals from './reportWebVitals';

axios.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('accessToken');
  request.baseURL = config.url.API_URL;
  request.headers['Content-Type'] = 'application/json';
  request.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return request;
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
