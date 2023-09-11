import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContextProvider from './store';
import App from './pages/app';

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
        <App />
    </AppContextProvider>
  </React.StrictMode>,
);
