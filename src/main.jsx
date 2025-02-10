// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@assets/main.css';

const App = React.lazy(() => import('./App'));

const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-primary">
    <div className="relative h-48 w-48">
      {/* Серп и молот */}
      <svg
        className="absolute left-1/2 top-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform text-red-500"
        viewBox="0 0 100 100"
      >
        {/* Молот */}
        <path
          d="M50 20L70 35V65L50 85L30 65V35L50 20Z"
          fill="currentColor"
          className="drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]"
        />
        
        {/* Серп (исправленная кривая) */}
        <path
          d="M25 70Q40 45 70 40Q85 55 80 75L55 95L25 70Z"
          fill="currentColor"
          className="drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]"
        />
      </svg>

      {/* Вращающаяся звезда с исправленной орбитой */}
      <div className="absolute left-0 top-0 h-full w-full animate-[soviet-orbit_4s_linear_infinite]">
        <svg
          className="h-10 w-10 text-red-500"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5L63.3 35.8H98.4L70.8 56.1L84.1 86.8L50 66.5L15.9 86.8L29.2 56.1L1.6 35.8H36.7L50 5Z"
            fill="currentColor"
            className="animate-[spin-slow_3s_linear_infinite] drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]"
          />
        </svg>
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