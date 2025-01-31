// Библиотеки
import React from 'react';
import ReactDOM from 'react-dom/client';

import '@assets/main.css';

// Основной компонент приложения (ленивая загрузка при необходимости)
const App = React.lazy(() => import('@components/App/App'));


// Создание корневого элемента React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Точка входа приложения
 * - Использует StrictMode для детектирования проблем
 * - Оборачивает App в Suspense для ленивой загрузки
 */
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);