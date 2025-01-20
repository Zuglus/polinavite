// Библиотеки
import React from 'react';
import ReactDOM from 'react-dom/client';

// Компоненты
import App from './App';

// Стили
import './main.css';

// Создание корневого элемента React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеринг приложения в StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
