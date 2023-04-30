import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Store } from 'redux';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function entryClient(store: Store) {
  ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

entryClient(store);
