import React from 'react';
import ReactDOM from 'react-dom/client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./index.css"
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store ={store}>
  <React.StrictMode>
    <App />
    <ToastContainer/>
  </React.StrictMode> 
  </Provider>
);


