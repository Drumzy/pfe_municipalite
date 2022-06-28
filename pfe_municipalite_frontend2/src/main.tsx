import React from 'react'
import {createRoot} from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App'
import './index.css'
import { store } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

const container: HTMLElement | null = document.getElementById('root');

const root = createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
)
