// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@assets/main.css';
import ErrorBoundary from '@components/ErrorBoundary';

const App = React.lazy(() => import('./App'));

const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-primary">
    <div className="relative">
      {/* Группа колец */}
      <div className="relative h-32 w-32 md:h-24 md:w-24">
        {/* Статичные кольца на фоне */}
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="stroke-secondary opacity-20"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="stroke-secondary opacity-15"
          />
        </svg>

        {/* Анимированное внешнее кольцо */}
        <svg
          className="absolute inset-0 animate-spin-slow"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="30 10"
            className="stroke-secondary"
          />
        </svg>

        {/* Анимированное внутреннее кольцо */}
        <svg
          className="absolute inset-0 animate-spin-slow -rotate-180"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="20 10"
            className="stroke-secondary"
          />
        </svg>
      </div>

      {/* Текст */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full text-center">
        <div className="text-secondary text-xl tracking-widest animate-pulse-slow font-mv-skifer">
          {/* Текст загрузки */}
          ЗАГРУЗКА
        </div>
      </div>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <React.Suspense fallback={<Loader />}>
        <App />
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);