
import React from 'react';
import ReactDOM from 'react-dom';
import { OAuthProvider } from '@react-oauth/google';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
