import React from 'react';
import { render } from "react-dom";
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import { UserProvider } from './context/user.context';
import { ProductsProvider } from './context/product.context';
import './index.scss';

const rootElement =document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
