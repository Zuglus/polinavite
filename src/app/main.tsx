import React from 'react';
import ReactDOM from 'react-dom/client';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import App from './app';
import { HelmetProvider } from 'react-helmet-async';

// Включаем отслеживание для @legendapp/state
enableReactTracking({
  auto: true,
});

/**
 * Инициализация приложения
 */
const initApp = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
};

// Запускаем приложение
initApp();