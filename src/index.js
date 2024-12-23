import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import ComSnackbar from './components/ComSnackbar';


// import {router} from '../src/components/Routes'
// import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ComSnackbar />
      </Provider>,
  </React.StrictMode>
);

