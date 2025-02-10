// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@assets/main.css';

const App = React.lazy(() => import('./App'));

const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-primary">
    <div className="relative">
      {/* Группа колец */}
      <div className="relative h-32 w-32">
        {/* Статичные кольца на фоне */}
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#3624A6"
            strokeWidth="2"
            opacity="0.2"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#3624A6"
            strokeWidth="2"
            opacity="0.15"
          />
        </svg>

        {/* Анимированное внешнее кольцо */}
        <svg 
          className="absolute inset-0 animate-[spin_8s_linear_infinite]" 
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#3624A6"
            strokeWidth="2"
            strokeDasharray="30 10"
          />
        </svg>

        {/* Анимированное внутреннее кольцо */}
        <svg 
          className="absolute inset-0 animate-[spin_6s_linear_infinite_reverse]" 
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="#3624A6"
            strokeWidth="2"
            strokeDasharray="20 10"
          />
        </svg>
      </div>

      {/* Текст */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full text-center">
        <div className="text-[#3624A6] text-xl tracking-widest animate-pulse font-mv-skifer">
          ЗАГРУЗКА
        </div>
      </div>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <React.Suspense fallback={<Loader />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);