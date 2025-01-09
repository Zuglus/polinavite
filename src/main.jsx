/**
 * Этот файл является точкой входа для React приложения.
 * Он инициализирует React приложение и рендерит корневой компонент App.
 */


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
