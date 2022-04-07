import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from "./redux/auth"

const store = configureStore({
  reducer:{
    user: userReducer,
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

