# Сборка файлов проекта
# Создано: 2025-03-08T17:11:07.376Z
# Исходная директория: /Users/z/polinavite


### Файл: /Users/z/polinavite/.gitignore (274 байт)
[Бинарный файл: /Users/z/polinavite/.gitignore (274 байт)]

### Файл: /Users/z/polinavite/README.md (2.03 КБ)
```md
# Портфолио Полины Миграновой - Графический дизайнер

## Описание

Сайт-портфолио графического дизайнера Полины Миграновой. Представляет собой одностраничное приложение (SPA) на React, использующее Vite для сборки.

## Используемые технологии

*   React
*   Vite
*   Tailwind CSS
*   @legendapp/state (для управления состоянием)
*   framer-motion (для анимаций)
*   RxJS (для предзагрузки изображений и обработки событий)

## Структура проекта

src/
├── components/        # Переиспользуемые компоненты
│   ├── ui/            # Базовые UI компоненты (кнопки, инпуты, скелетоны)
│   └── features/      # Компоненты с бизнес-логикой (секции портфолио, модальные окна)
├── hooks/             # Кастомные хуки
├── stores/            # Observable stores (@legendapp/state)
├── services/          # Сервисы (imageService, navigationService)
├── constants/         # Константы (цвета, стили, данные проектов)
├── utils/             # Вспомогательные функции
├── assets/            # Статические файлы
│   ├── images/        # Изображения
│   └── fonts/         # Шрифты
└── App.jsx            # Главный компонент приложения

## Установка и запуск

1.  Клонировать репозиторий:
```bash
git clone https://github.com/Zuglus/polinavite.git
```

2. Установить зависимости:
```bash
npm install
```

3. Запустить в режиме разработки
```bash
npm run dev
```

## Сборка
```bash
  npm run build
```
```

### Файл: /Users/z/polinavite/eslint.config.js (1.57 КБ)
```js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

// Функция для очистки пробелов в ключах объекта
const cleanGlobals = (globalsObj) => {
  return Object.entries(globalsObj).reduce((acc, [key, value]) => {
    const cleanKey = key.trim();
    acc[cleanKey] = value;
    return acc;
  }, {});
};

// Очищаем глобальные объекты
const browserGlobals = cleanGlobals(globals.browser);
const nodeGlobals = cleanGlobals(globals.node);

export default [
  { ignores: ['dist', '*.config.js'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...browserGlobals,
        ...nodeGlobals
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    settings: { 
      react: { 
        version: 'detect'
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    }
  }
]
```

### Файл: /Users/z/polinavite/index.html (1.23 КБ)
```html
<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO метатеги -->
  <title>Полина Мигранова | Графический дизайнер</title>
  <meta name="description"
    content="Портфолио графического дизайнера Полины Миграновой. Создание современного дизайна, брендинг, иллюстрации и веб-дизайн.">
  <meta name="keywords" content="графический дизайнер, дизайн, брендинг, логотипы, веб-дизайн, Полина Мигранова">
  <meta name="author" content="Полина Мигранова">

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
  <link rel="manifest" href="/manifest.json">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>

<body class="bg-primary text-white font-onest">
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>
```

### Файл: /Users/z/polinavite/package.json (801 байт)
```json
{
  "name": "polinavite",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@legendapp/state": "^2.1.15",
    "framer-motion": "^10.17.9",
    "observable-hooks": "^4.2.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.47",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1",
    "vite": "^5.0.11"
  }
}
```

### Файл: /Users/z/polinavite/postcss.config.cjs (82 байт)
```cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

## Директория: /Users/z/polinavite/public


### Файл: /Users/z/polinavite/public/android-chrome-192x192.png (30.10 КБ)
[Бинарный файл: /Users/z/polinavite/public/android-chrome-192x192.png (30.10 КБ)]

### Файл: /Users/z/polinavite/public/android-chrome-512x512.png (124.22 КБ)
[Бинарный файл: /Users/z/polinavite/public/android-chrome-512x512.png (124.22 КБ)]

### Файл: /Users/z/polinavite/public/apple-touch-icon.png (27.63 КБ)
[Бинарный файл: /Users/z/polinavite/public/apple-touch-icon.png (27.63 КБ)]

### Файл: /Users/z/polinavite/public/favicon-16x16.png (710 байт)
[Бинарный файл: /Users/z/polinavite/public/favicon-16x16.png (710 байт)]

### Файл: /Users/z/polinavite/public/favicon-32x32.png (1.93 КБ)
[Бинарный файл: /Users/z/polinavite/public/favicon-32x32.png (1.93 КБ)]

### Файл: /Users/z/polinavite/public/favicon.ico (15.04 КБ)
[Бинарный файл: /Users/z/polinavite/public/favicon.ico (15.04 КБ)]

### Файл: /Users/z/polinavite/public/manifest.json (561 байт)
```json
{
  "short_name": "Портфолио",
  "name": "Полина Мигранова | Портфолио",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#ffffff",
  "background_color": "#04061B"
}
```

### Файл: /Users/z/polinavite/public/robots.txt (22 байт)
```txt
User-agent: *
Allow: /
```

### Файл: /Users/z/polinavite/public/site.webmanifest (263 байт)
[Бинарный файл: /Users/z/polinavite/public/site.webmanifest (263 байт)]

## Директория: /Users/z/polinavite/src


### Файл: /Users/z/polinavite/src/App.jsx (2.25 КБ)
```jsx
// src/App.jsx
import React, { useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { observer } from '@legendapp/state/react';

// UI Components
import { Header, Footer } from '@/components/ui';

// Stores and Services
import { modalStore } from '@/stores';
import { imageService } from '@/services';

// Data
import { projects } from '@/constants/projectsData';

// Hooks
import { useLockBodyScroll } from '@/hooks';

// Ленивая загрузка компонентов
const PortfolioSection = React.lazy(() => 
  import('@/components/features/Portfolio').then(module => ({
    default: module.PortfolioSection
  }))
);

const ProjectModal = React.lazy(() => 
  import('@/components/features/Modal').then(module => ({
    default: module.ProjectModal
  }))
);

// Компонент для отображения во время загрузки
const ComponentLoader = () => (
  <div className="w-full h-32 animate-pulse bg-white/5 rounded-lg" />
);

const App = observer(() => {
  const isModalOpen = modalStore.useIsOpen();
  const currentProject = modalStore.useCurrentProject();

  useEffect(() => {
    // Предзагрузка только первых трех изображений для каждого проекта
    const imageUrls = projects
      .map(project => project.slides.slice(0, 3)
      .map(slide => slide.image))
      .flat();

    imageService.preloadImages(imageUrls);
  }, []);

  useLockBodyScroll(isModalOpen);

  const handleCardClick = (id) => {
    const project = projects.find(p => p.id === id);
    modalStore.openModal(id, project);
  };

  const handleCloseModal = () => {
    modalStore.closeModal();
  };

  return (
    <div className="bg-primary text-white min-h-screen">
      <Header />
      
      <Suspense fallback={<ComponentLoader />}>
        <PortfolioSection onCardClick={handleCardClick} />
      </Suspense>
      
      <Footer />
      
      <AnimatePresence>
        {isModalOpen && currentProject && (
          <Suspense fallback={<ComponentLoader />}>
            <ProjectModal 
              project={currentProject} 
              onClose={handleCloseModal} 
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
});

export default App;
```

## Директория: /Users/z/polinavite/src/assets


## Директория: /Users/z/polinavite/src/assets/fonts


### Файл: /Users/z/polinavite/src/assets/fonts/MV-SKIFER.otf (143.88 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/MV-SKIFER.otf (143.88 КБ)]

### Файл: /Users/z/polinavite/src/assets/fonts/Onest-Black.ttf (62.68 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/Onest-Black.ttf (62.68 КБ)]

### Файл: /Users/z/polinavite/src/assets/fonts/Onest-Bold.ttf (62.91 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/Onest-Bold.ttf (62.91 КБ)]

### Файл: /Users/z/polinavite/src/assets/fonts/Onest-ExtraBold.ttf (62.88 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/Onest-ExtraBold.ttf (62.88 КБ)]

### Файл: /Users/z/polinavite/src/assets/fonts/Onest-ExtraLight.ttf (62.91 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/Onest-ExtraLight.ttf (62.91 КБ)]

### Файл: /Users/z/polinavite/src/assets/fonts/Onest-Light.ttf (62.87 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/Onest-Light.ttf (62.87 КБ)]

### Файл: /Users/z/polinavite/src/assets/fonts/Onest-Medium.ttf (62.93 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/Onest-Medium.ttf (62.93 КБ)]

### Файл: /Users/z/polinavite/src/assets/fonts/Onest-Regular.ttf (62.77 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/Onest-Regular.ttf (62.77 КБ)]

### Файл: /Users/z/polinavite/src/assets/fonts/Onest-SemiBold.ttf (62.93 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/Onest-SemiBold.ttf (62.93 КБ)]

### Файл: /Users/z/polinavite/src/assets/fonts/Onest-Thin.ttf (62.86 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/Onest-Thin.ttf (62.86 КБ)]

### Файл: /Users/z/polinavite/src/assets/fonts/Onest-VariableFont_wght.ttf (120.46 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/fonts/Onest-VariableFont_wght.ttf (120.46 КБ)]

## Директория: /Users/z/polinavite/src/assets/images


### Файл: /Users/z/polinavite/src/assets/images/center.png (75.04 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/center.png (75.04 КБ)]

## Директория: /Users/z/polinavite/src/assets/images/code


### Файл: /Users/z/polinavite/src/assets/images/code/code1.png (557.23 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/code/code1.png (557.23 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/code/code2.png (800.06 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/code/code2.png (800.06 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/code/code3.png (730.38 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/code/code3.png (730.38 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/code/code4.png (961.16 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/code/code4.png (961.16 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/code.png (287.75 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/code.png (287.75 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/day.png (88.57 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/day.png (88.57 КБ)]

## Директория: /Users/z/polinavite/src/assets/images/fizics


### Файл: /Users/z/polinavite/src/assets/images/fizics/fizics1.png (1.62 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/fizics/fizics1.png (1.62 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/fizics/fizics2.png (1.63 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/fizics/fizics2.png (1.63 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/fizics/fizics3.png (1.38 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/fizics/fizics3.png (1.38 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/foto.png (88.53 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/foto.png (88.53 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/koltsa_fon1.svg (1.42 КБ)
```svg
<svg width="781" height="845" viewBox="0 0 781 845" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.07">
<path d="M280.295 556.631C404.279 556.631 505.16 455.094 505.16 330.304C505.16 205.513 404.279 103.977 280.295 103.977C156.31 103.977 55.4293 205.513 55.4293 330.304C55.4293 455.094 156.31 556.631 280.295 556.631ZM280.295 116.656C397.351 116.656 492.563 212.487 492.563 330.304C492.563 448.121 397.351 543.951 280.295 543.951C163.239 543.951 68.0268 448.121 68.0268 330.304C68.0268 212.487 163.239 116.656 280.295 116.656Z" fill="white"/>
<path d="M499.904 844.999C654.615 844.999 780.496 717.671 780.496 561.182C780.496 404.693 654.615 277.365 499.904 277.365C345.194 277.365 219.312 404.693 219.312 561.182C219.312 717.671 345.194 844.999 499.904 844.999ZM499.904 293.265C645.969 293.265 764.777 413.438 764.777 561.182C764.777 708.926 645.969 829.099 499.904 829.099C353.839 829.099 235.032 708.926 235.032 561.182C235.032 413.438 353.839 293.265 499.904 293.265Z" fill="white"/>
<path d="M166.917 336.004C258.954 336.004 333.834 260.638 333.834 168.002C333.834 75.3663 258.954 0 166.917 0C74.8797 0 0.000105739 75.3663 0.000105739 168.002C0.000105739 260.638 74.8797 336.004 166.917 336.004ZM166.917 12.6794C252.001 12.6794 321.236 82.3653 321.236 168.002C321.236 253.639 252.001 323.324 166.917 323.324C81.8335 323.324 12.5976 253.639 12.5976 168.002C12.5976 82.3653 81.8335 12.6794 166.917 12.6794Z" fill="white"/>
</g>
</svg>

```

### Файл: /Users/z/polinavite/src/assets/images/kruzhok_opyt_raboty.svg (1.16 КБ)
```svg
<svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="42" cy="42" r="42" fill="url(#paint0_linear_3810_1307)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M47.7551 22.2246L31.9266 28.8072C29.0396 39.3927 24.6896 49.2913 19 58.5761L21.5857 60.9303L40.2295 42.4632C39.987 42.04 39.851 41.5472 39.851 41.0232C39.851 39.4019 41.1723 38.0901 42.7932 38.0901C44.4141 38.0901 45.7354 39.4074 45.7354 41.0232C45.7354 42.6391 44.4196 43.9564 42.7932 43.9564H42.7895C42.3742 43.9564 41.9625 43.8702 41.584 43.6962L22.7416 62.319L24.6694 64.7061C34.1687 59.3089 44.2303 54.9541 55.0325 51.9697L61.4021 36.2398L47.7551 22.2246Z" stroke="white" stroke-miterlimit="10"/>
<path d="M54.8264 16C53.5713 17.2495 52.3142 18.4989 51.0591 19.7465L49.8535 20.9172L63.0724 34.4231L64.2779 33.2524C65.546 31.9608 66.8158 30.6692 68.0839 29.3776C63.6641 24.9184 59.2444 20.4592 54.8264 16Z" stroke="white" stroke-miterlimit="10"/>
<defs>
<linearGradient id="paint0_linear_3810_1307" x1="42" y1="0" x2="42" y2="84" gradientUnits="userSpaceOnUse">
<stop stop-color="#3624A6"/>
<stop offset="1" stop-color="#150E40"/>
</linearGradient>
</defs>
</svg>

```

### Файл: /Users/z/polinavite/src/assets/images/logo.svg (15.05 КБ)
```svg
<svg width="110" height="129" viewBox="0 0 110 129" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M43.4537 86.2939C62.675 86.2939 78.3145 70.5527 78.3145 51.2065C78.3145 31.8603 62.675 16.1191 43.4537 16.1191C24.2324 16.1191 8.59293 31.8603 8.59293 51.2065C8.59293 70.5527 24.2324 86.2939 43.4537 86.2939ZM43.4537 18.0848C61.6008 18.0848 76.3615 32.9414 76.3615 51.2065C76.3615 69.4716 61.6008 84.3282 43.4537 84.3282C25.3066 84.3282 10.5459 69.4716 10.5459 51.2065C10.5459 32.9414 25.3066 18.0848 43.4537 18.0848Z" fill="white"/>
<path d="M25.8769 52.0905C40.1454 52.0905 51.7539 40.4065 51.7539 26.0452C51.7539 11.684 40.1454 0 25.8769 0C11.6084 0 -0.00016278 11.684 -0.00016278 26.0452C-0.00016278 40.4065 11.6084 52.0905 25.8769 52.0905ZM25.8769 1.96568C39.0673 1.96568 49.8009 12.769 49.8009 26.0452C49.8009 39.3214 39.0673 50.1248 25.8769 50.1248C12.6864 50.1248 1.95282 39.3214 1.95282 26.0452C1.95282 12.769 12.6864 1.96568 25.8769 1.96568Z" fill="white"/>
<circle cx="68" cy="87" r="42" fill="url(#paint0_linear_3818_1331)"/>
<mask id="path-4-outside-1_3818_1331" maskUnits="userSpaceOnUse" x="32" y="68" width="72" height="39" fill="black">
<rect fill="white" x="32" y="68" width="72" height="39"/>
<path d="M65.4597 82.9827C63.9592 89.1153 59.0736 94.3524 52.992 96.3554C50.6529 97.1275 48.5389 97.2643 46.7162 96.7745C45.4981 99.7173 44.3507 102.682 43.2562 105.665C43.1723 105.876 42.9781 106 42.7663 106C42.7089 106 42.6383 105.987 42.5853 105.974C42.3205 105.876 42.1793 105.568 42.2764 105.303C43.3533 102.334 44.5184 99.382 45.7365 96.4392C43.6622 95.5436 41.76 93.3861 41.9807 90.8095C42.1087 89.4506 42.8766 87.5314 43.746 86.4417C46.1425 83.4018 49.4481 81.3326 53.3009 80.4634C53.4951 80.4237 53.707 80.4899 53.835 80.6443C53.9629 80.812 53.9762 81.0238 53.8923 81.2047C51.4694 85.9652 49.2142 90.8537 47.1267 95.7951C48.7243 96.1877 50.6132 96.0333 52.661 95.3627C58.4028 93.4876 63.0412 88.5285 64.4402 82.7444C65.2125 79.5943 64.8198 76.4838 63.3634 74.2425C62.0305 72.1689 59.665 70.713 56.8625 70.2232C54.0909 69.7335 51.2752 70.3071 48.892 70.938C39.827 73.3204 33.7233 82.2415 34.0455 83.9357C34.1029 84.2136 33.9175 84.496 33.6263 84.5401C33.3482 84.5975 33.079 84.4122 33.026 84.1342C32.5185 81.4297 39.4916 72.3277 48.6228 69.932C50.9751 69.3144 54.0424 68.6702 57.039 69.1908C60.1196 69.7379 62.7411 71.3748 64.2372 73.6734C65.8481 76.1662 66.2806 79.5546 65.4553 82.9871L65.4597 82.9827ZM52.4359 81.765C49.298 82.7047 46.5794 84.5225 44.5625 87.0858C43.8343 88.0079 43.1326 89.7595 43.0223 90.8934C42.8678 92.7155 44.183 94.648 46.1337 95.473C48.08 90.8404 50.1939 86.2431 52.4359 81.765Z"/>
<path d="M93.8243 89.9845C93.1534 89.508 92.7165 88.8374 92.5223 87.9682C92.3281 87.0858 92.2708 86.1637 92.3546 85.1534C92.4385 84.1607 92.5664 83.2342 92.7033 82.3959C92.7739 81.99 92.8312 81.6238 92.871 81.2885C92.2708 81.8223 91.4719 82.7312 90.4878 84.0195C89.4948 85.3078 88.6518 86.4284 87.9545 87.3947C87.0454 88.6565 86.401 89.508 86.0082 89.958L85.6993 90.3066C84.8166 91.3699 83.8766 92.2787 82.8836 93.0773C82.5614 93.3155 82.1951 93.5273 81.7758 93.7214C81.3566 93.9023 80.9196 93.9597 80.4739 93.8759C79.9575 93.7788 79.5515 93.4435 79.2426 92.8964C79.2293 92.8832 79.2293 92.8699 79.2161 92.8567C78.8674 92.0184 78.6997 91.0787 78.713 90.0683C78.6556 88.8065 78.6865 87.5491 78.7836 86.274C78.9116 84.7916 79.0616 83.3312 79.2602 81.9062C79.3706 81.1076 79.4721 80.2958 79.5692 79.484C79.7369 78.0677 79.8472 76.6427 79.9046 75.1999C79.9619 74.2602 79.931 73.3381 79.8207 72.4116C79.7766 72.3145 79.7501 72.2174 79.7236 72.1468C79.6971 72.0895 79.6662 72.0365 79.6398 72.0057C79.6133 71.966 79.5956 71.9483 79.5824 71.9351C79.5691 71.9218 79.5559 71.9218 79.5559 71.9218C79.4985 71.8954 79.375 71.9483 79.1896 72.0895C78.9954 72.2307 78.6997 72.5395 78.2937 72.9851L78.2231 73.069C77.2698 74.1764 76.4004 75.3808 75.5883 76.6515C74.7763 77.9265 74.0745 79.131 73.4434 80.2649C71.6516 83.4856 70.0805 86.6799 68.7388 89.8433C67.0308 93.8759 65.9099 96.8451 65.3891 98.7202C64.8683 100.595 64.6741 101.787 64.7889 102.303C64.8021 102.444 64.7624 102.567 64.6785 102.682C64.5947 102.797 64.4843 102.85 64.3299 102.876H64.2725C64.1445 102.876 64.0342 102.832 63.9371 102.748C63.84 102.665 63.7826 102.554 63.7561 102.413C63.5311 100.578 64.8771 96.2363 67.7899 89.433C69.1492 86.2387 70.7336 83.018 72.5519 79.7575C73.183 78.6104 73.9112 77.3751 74.7365 76.0603C75.5618 74.7587 76.4577 73.5278 77.4552 72.3895L77.5258 72.3057C77.8215 71.9395 78.1569 71.5909 78.5497 71.2689C78.9425 70.96 79.3485 70.8365 79.7942 70.9027C80.2841 71.013 80.6195 71.4365 80.8314 72.1645C80.8314 72.191 80.8446 72.2086 80.8446 72.2351C80.9726 73.2278 80.9991 74.2249 80.9417 75.2441C80.8711 76.7 80.7608 78.156 80.593 79.5987C80.5092 80.4105 80.4121 81.2223 80.2974 82.0341C80.1032 83.4504 79.931 84.8754 79.8207 86.3314C79.7104 87.5623 79.6927 88.8109 79.7501 90.0419C79.7369 90.9243 79.8781 91.7096 80.1694 92.4067C80.3106 92.6582 80.4915 92.8126 80.6857 92.8567C81.052 92.9405 81.5816 92.7288 82.2701 92.2258C83.1793 91.4978 84.0752 90.6286 84.9181 89.6051L85.2403 89.2565C85.6198 88.8065 86.251 87.9815 87.116 86.777C88.9519 84.2577 90.3245 82.493 91.2336 81.4561C92.156 80.4193 92.8312 79.9428 93.2638 80.0399C93.5595 80.0796 93.7536 80.2517 93.864 80.5296C93.9213 80.684 93.9346 80.9223 93.9081 81.2311C93.8816 81.54 93.8243 81.9723 93.7272 82.5327C93.5992 83.2474 93.5021 84.0592 93.4182 84.9416C93.3344 85.824 93.3476 86.649 93.4756 87.4211C93.5859 88.1932 93.8949 88.7536 94.398 89.1021C94.6628 89.3139 95.0997 89.4109 95.6867 89.3977C96.2604 89.3977 97.0592 89.1859 98.0522 88.7933C99.0629 88.4006 100.321 87.7167 101.848 86.7329C102.351 86.3976 102.704 86.3667 102.911 86.649C103.123 86.9138 102.955 87.2358 102.408 87.602C98.3038 90.2625 95.4484 91.0478 93.8198 89.9669L93.8243 89.9845Z"/>
</mask>
<path d="M65.4597 82.9827C63.9592 89.1153 59.0736 94.3524 52.992 96.3554C50.6529 97.1275 48.5389 97.2643 46.7162 96.7745C45.4981 99.7173 44.3507 102.682 43.2562 105.665C43.1723 105.876 42.9781 106 42.7663 106C42.7089 106 42.6383 105.987 42.5853 105.974C42.3205 105.876 42.1793 105.568 42.2764 105.303C43.3533 102.334 44.5184 99.382 45.7365 96.4392C43.6622 95.5436 41.76 93.3861 41.9807 90.8095C42.1087 89.4506 42.8766 87.5314 43.746 86.4417C46.1425 83.4018 49.4481 81.3326 53.3009 80.4634C53.4951 80.4237 53.707 80.4899 53.835 80.6443C53.9629 80.812 53.9762 81.0238 53.8923 81.2047C51.4694 85.9652 49.2142 90.8537 47.1267 95.7951C48.7243 96.1877 50.6132 96.0333 52.661 95.3627C58.4028 93.4876 63.0412 88.5285 64.4402 82.7444C65.2125 79.5943 64.8198 76.4838 63.3634 74.2425C62.0305 72.1689 59.665 70.713 56.8625 70.2232C54.0909 69.7335 51.2752 70.3071 48.892 70.938C39.827 73.3204 33.7233 82.2415 34.0455 83.9357C34.1029 84.2136 33.9175 84.496 33.6263 84.5401C33.3482 84.5975 33.079 84.4122 33.026 84.1342C32.5185 81.4297 39.4916 72.3277 48.6228 69.932C50.9751 69.3144 54.0424 68.6702 57.039 69.1908C60.1196 69.7379 62.7411 71.3748 64.2372 73.6734C65.8481 76.1662 66.2806 79.5546 65.4553 82.9871L65.4597 82.9827ZM52.4359 81.765C49.298 82.7047 46.5794 84.5225 44.5625 87.0858C43.8343 88.0079 43.1326 89.7595 43.0223 90.8934C42.8678 92.7155 44.183 94.648 46.1337 95.473C48.08 90.8404 50.1939 86.2431 52.4359 81.765Z" fill="white"/>
<path d="M93.8243 89.9845C93.1534 89.508 92.7165 88.8374 92.5223 87.9682C92.3281 87.0858 92.2708 86.1637 92.3546 85.1534C92.4385 84.1607 92.5664 83.2342 92.7033 82.3959C92.7739 81.99 92.8312 81.6238 92.871 81.2885C92.2708 81.8223 91.4719 82.7312 90.4878 84.0195C89.4948 85.3078 88.6518 86.4284 87.9545 87.3947C87.0454 88.6565 86.401 89.508 86.0082 89.958L85.6993 90.3066C84.8166 91.3699 83.8766 92.2787 82.8836 93.0773C82.5614 93.3155 82.1951 93.5273 81.7758 93.7214C81.3566 93.9023 80.9196 93.9597 80.4739 93.8759C79.9575 93.7788 79.5515 93.4435 79.2426 92.8964C79.2293 92.8832 79.2293 92.8699 79.2161 92.8567C78.8674 92.0184 78.6997 91.0787 78.713 90.0683C78.6556 88.8065 78.6865 87.5491 78.7836 86.274C78.9116 84.7916 79.0616 83.3312 79.2602 81.9062C79.3706 81.1076 79.4721 80.2958 79.5692 79.484C79.7369 78.0677 79.8472 76.6427 79.9046 75.1999C79.9619 74.2602 79.931 73.3381 79.8207 72.4116C79.7766 72.3145 79.7501 72.2174 79.7236 72.1468C79.6971 72.0895 79.6662 72.0365 79.6398 72.0057C79.6133 71.966 79.5956 71.9483 79.5824 71.9351C79.5691 71.9218 79.5559 71.9218 79.5559 71.9218C79.4985 71.8954 79.375 71.9483 79.1896 72.0895C78.9954 72.2307 78.6997 72.5395 78.2937 72.9851L78.2231 73.069C77.2698 74.1764 76.4004 75.3808 75.5883 76.6515C74.7763 77.9265 74.0745 79.131 73.4434 80.2649C71.6516 83.4856 70.0805 86.6799 68.7388 89.8433C67.0308 93.8759 65.9099 96.8451 65.3891 98.7202C64.8683 100.595 64.6741 101.787 64.7889 102.303C64.8021 102.444 64.7624 102.567 64.6785 102.682C64.5947 102.797 64.4843 102.85 64.3299 102.876H64.2725C64.1445 102.876 64.0342 102.832 63.9371 102.748C63.84 102.665 63.7826 102.554 63.7561 102.413C63.5311 100.578 64.8771 96.2363 67.7899 89.433C69.1492 86.2387 70.7336 83.018 72.5519 79.7575C73.183 78.6104 73.9112 77.3751 74.7365 76.0603C75.5618 74.7587 76.4577 73.5278 77.4552 72.3895L77.5258 72.3057C77.8215 71.9395 78.1569 71.5909 78.5497 71.2689C78.9425 70.96 79.3485 70.8365 79.7942 70.9027C80.2841 71.013 80.6195 71.4365 80.8314 72.1645C80.8314 72.191 80.8446 72.2086 80.8446 72.2351C80.9726 73.2278 80.9991 74.2249 80.9417 75.2441C80.8711 76.7 80.7608 78.156 80.593 79.5987C80.5092 80.4105 80.4121 81.2223 80.2974 82.0341C80.1032 83.4504 79.931 84.8754 79.8207 86.3314C79.7104 87.5623 79.6927 88.8109 79.7501 90.0419C79.7369 90.9243 79.8781 91.7096 80.1694 92.4067C80.3106 92.6582 80.4915 92.8126 80.6857 92.8567C81.052 92.9405 81.5816 92.7288 82.2701 92.2258C83.1793 91.4978 84.0752 90.6286 84.9181 89.6051L85.2403 89.2565C85.6198 88.8065 86.251 87.9815 87.116 86.777C88.9519 84.2577 90.3245 82.493 91.2336 81.4561C92.156 80.4193 92.8312 79.9428 93.2638 80.0399C93.5595 80.0796 93.7536 80.2517 93.864 80.5296C93.9213 80.684 93.9346 80.9223 93.9081 81.2311C93.8816 81.54 93.8243 81.9723 93.7272 82.5327C93.5992 83.2474 93.5021 84.0592 93.4182 84.9416C93.3344 85.824 93.3476 86.649 93.4756 87.4211C93.5859 88.1932 93.8949 88.7536 94.398 89.1021C94.6628 89.3139 95.0997 89.4109 95.6867 89.3977C96.2604 89.3977 97.0592 89.1859 98.0522 88.7933C99.0629 88.4006 100.321 87.7167 101.848 86.7329C102.351 86.3976 102.704 86.3667 102.911 86.649C103.123 86.9138 102.955 87.2358 102.408 87.602C98.3038 90.2625 95.4484 91.0478 93.8198 89.9669L93.8243 89.9845Z" fill="white"/>
<path d="M65.4597 82.9827C63.9592 89.1153 59.0736 94.3524 52.992 96.3554C50.6529 97.1275 48.5389 97.2643 46.7162 96.7745C45.4981 99.7173 44.3507 102.682 43.2562 105.665C43.1723 105.876 42.9781 106 42.7663 106C42.7089 106 42.6383 105.987 42.5853 105.974C42.3205 105.876 42.1793 105.568 42.2764 105.303C43.3533 102.334 44.5184 99.382 45.7365 96.4392C43.6622 95.5436 41.76 93.3861 41.9807 90.8095C42.1087 89.4506 42.8766 87.5314 43.746 86.4417C46.1425 83.4018 49.4481 81.3326 53.3009 80.4634C53.4951 80.4237 53.707 80.4899 53.835 80.6443C53.9629 80.812 53.9762 81.0238 53.8923 81.2047C51.4694 85.9652 49.2142 90.8537 47.1267 95.7951C48.7243 96.1877 50.6132 96.0333 52.661 95.3627C58.4028 93.4876 63.0412 88.5285 64.4402 82.7444C65.2125 79.5943 64.8198 76.4838 63.3634 74.2425C62.0305 72.1689 59.665 70.713 56.8625 70.2232C54.0909 69.7335 51.2752 70.3071 48.892 70.938C39.827 73.3204 33.7233 82.2415 34.0455 83.9357C34.1029 84.2136 33.9175 84.496 33.6263 84.5401C33.3482 84.5975 33.079 84.4122 33.026 84.1342C32.5185 81.4297 39.4916 72.3277 48.6228 69.932C50.9751 69.3144 54.0424 68.6702 57.039 69.1908C60.1196 69.7379 62.7411 71.3748 64.2372 73.6734C65.8481 76.1662 66.2806 79.5546 65.4553 82.9871L65.4597 82.9827ZM52.4359 81.765C49.298 82.7047 46.5794 84.5225 44.5625 87.0858C43.8343 88.0079 43.1326 89.7595 43.0223 90.8934C42.8678 92.7155 44.183 94.648 46.1337 95.473C48.08 90.8404 50.1939 86.2431 52.4359 81.765Z" stroke="white" mask="url(#path-4-outside-1_3818_1331)"/>
<path d="M93.8243 89.9845C93.1534 89.508 92.7165 88.8374 92.5223 87.9682C92.3281 87.0858 92.2708 86.1637 92.3546 85.1534C92.4385 84.1607 92.5664 83.2342 92.7033 82.3959C92.7739 81.99 92.8312 81.6238 92.871 81.2885C92.2708 81.8223 91.4719 82.7312 90.4878 84.0195C89.4948 85.3078 88.6518 86.4284 87.9545 87.3947C87.0454 88.6565 86.401 89.508 86.0082 89.958L85.6993 90.3066C84.8166 91.3699 83.8766 92.2787 82.8836 93.0773C82.5614 93.3155 82.1951 93.5273 81.7758 93.7214C81.3566 93.9023 80.9196 93.9597 80.4739 93.8759C79.9575 93.7788 79.5515 93.4435 79.2426 92.8964C79.2293 92.8832 79.2293 92.8699 79.2161 92.8567C78.8674 92.0184 78.6997 91.0787 78.713 90.0683C78.6556 88.8065 78.6865 87.5491 78.7836 86.274C78.9116 84.7916 79.0616 83.3312 79.2602 81.9062C79.3706 81.1076 79.4721 80.2958 79.5692 79.484C79.7369 78.0677 79.8472 76.6427 79.9046 75.1999C79.9619 74.2602 79.931 73.3381 79.8207 72.4116C79.7766 72.3145 79.7501 72.2174 79.7236 72.1468C79.6971 72.0895 79.6662 72.0365 79.6398 72.0057C79.6133 71.966 79.5956 71.9483 79.5824 71.9351C79.5691 71.9218 79.5559 71.9218 79.5559 71.9218C79.4985 71.8954 79.375 71.9483 79.1896 72.0895C78.9954 72.2307 78.6997 72.5395 78.2937 72.9851L78.2231 73.069C77.2698 74.1764 76.4004 75.3808 75.5883 76.6515C74.7763 77.9265 74.0745 79.131 73.4434 80.2649C71.6516 83.4856 70.0805 86.6799 68.7388 89.8433C67.0308 93.8759 65.9099 96.8451 65.3891 98.7202C64.8683 100.595 64.6741 101.787 64.7889 102.303C64.8021 102.444 64.7624 102.567 64.6785 102.682C64.5947 102.797 64.4843 102.85 64.3299 102.876H64.2725C64.1445 102.876 64.0342 102.832 63.9371 102.748C63.84 102.665 63.7826 102.554 63.7561 102.413C63.5311 100.578 64.8771 96.2363 67.7899 89.433C69.1492 86.2387 70.7336 83.018 72.5519 79.7575C73.183 78.6104 73.9112 77.3751 74.7365 76.0603C75.5618 74.7587 76.4577 73.5278 77.4552 72.3895L77.5258 72.3057C77.8215 71.9395 78.1569 71.5909 78.5497 71.2689C78.9425 70.96 79.3485 70.8365 79.7942 70.9027C80.2841 71.013 80.6195 71.4365 80.8314 72.1645C80.8314 72.191 80.8446 72.2086 80.8446 72.2351C80.9726 73.2278 80.9991 74.2249 80.9417 75.2441C80.8711 76.7 80.7608 78.156 80.593 79.5987C80.5092 80.4105 80.4121 81.2223 80.2974 82.0341C80.1032 83.4504 79.931 84.8754 79.8207 86.3314C79.7104 87.5623 79.6927 88.8109 79.7501 90.0419C79.7369 90.9243 79.8781 91.7096 80.1694 92.4067C80.3106 92.6582 80.4915 92.8126 80.6857 92.8567C81.052 92.9405 81.5816 92.7288 82.2701 92.2258C83.1793 91.4978 84.0752 90.6286 84.9181 89.6051L85.2403 89.2565C85.6198 88.8065 86.251 87.9815 87.116 86.777C88.9519 84.2577 90.3245 82.493 91.2336 81.4561C92.156 80.4193 92.8312 79.9428 93.2638 80.0399C93.5595 80.0796 93.7536 80.2517 93.864 80.5296C93.9213 80.684 93.9346 80.9223 93.9081 81.2311C93.8816 81.54 93.8243 81.9723 93.7272 82.5327C93.5992 83.2474 93.5021 84.0592 93.4182 84.9416C93.3344 85.824 93.3476 86.649 93.4756 87.4211C93.5859 88.1932 93.8949 88.7536 94.398 89.1021C94.6628 89.3139 95.0997 89.4109 95.6867 89.3977C96.2604 89.3977 97.0592 89.1859 98.0522 88.7933C99.0629 88.4006 100.321 87.7167 101.848 86.7329C102.351 86.3976 102.704 86.3667 102.911 86.649C103.123 86.9138 102.955 87.2358 102.408 87.602C98.3038 90.2625 95.4484 91.0478 93.8198 89.9669L93.8243 89.9845Z" stroke="white" mask="url(#path-4-outside-1_3818_1331)"/>
<defs>
<linearGradient id="paint0_linear_3818_1331" x1="68" y1="45" x2="68" y2="129" gradientUnits="userSpaceOnUse">
<stop stop-color="#3624A6"/>
<stop offset="1" stop-color="#150E40"/>
</linearGradient>
</defs>
</svg>

```

## Директория: /Users/z/polinavite/src/assets/images/niti


### Файл: /Users/z/polinavite/src/assets/images/niti/niti1.png (499.34 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/niti/niti1.png (499.34 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/niti/niti2.png (187.63 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/niti/niti2.png (187.63 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/niti/niti3.png (459.62 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/niti/niti3.png (459.62 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/niti/niti4.png (1.11 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/niti/niti4.png (1.11 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/niti/niti5.png (732.89 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/niti/niti5.png (732.89 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/portfolio.svg (1.41 КБ)
```svg
<svg width="781" height="845" viewBox="0 0 781 845" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.07">
<path d="M500.201 288.369C376.217 288.369 275.336 389.906 275.336 514.696C275.336 639.487 376.217 741.023 500.201 741.023C624.186 741.023 725.067 639.487 725.067 514.696C725.067 389.906 624.186 288.369 500.201 288.369ZM500.201 728.344C383.145 728.344 287.933 632.513 287.933 514.696C287.933 396.879 383.145 301.049 500.201 301.049C617.257 301.049 712.469 396.879 712.469 514.696C712.469 632.513 617.257 728.344 500.201 728.344Z" fill="white"/>
<path d="M280.592 0.00062561C125.881 0.00062561 0 127.329 0 283.818C0 440.307 125.881 567.635 280.592 567.635C435.303 567.635 561.184 440.307 561.184 283.818C561.184 127.329 435.303 0.00062561 280.592 0.00062561ZM280.592 551.735C134.527 551.735 15.7194 431.562 15.7194 283.818C15.7194 136.074 134.527 15.9007 280.592 15.9007C426.657 15.9007 545.464 136.074 545.464 283.818C545.464 431.562 426.657 551.735 280.592 551.735Z" fill="white"/>
<path d="M613.579 508.996C521.542 508.996 446.662 584.362 446.662 676.998C446.662 769.634 521.542 845 613.579 845C705.616 845 780.496 769.634 780.496 676.998C780.496 584.362 705.616 508.996 613.579 508.996ZM613.579 832.321C528.495 832.321 459.26 762.635 459.26 676.998C459.26 591.361 528.495 521.676 613.579 521.676C698.663 521.676 767.898 591.361 767.898 676.998C767.898 762.635 698.663 832.321 613.579 832.321Z" fill="white"/>
</g>
</svg>

```

### Файл: /Users/z/polinavite/src/assets/images/presentation.png (596.87 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentation.png (596.87 КБ)]

## Директория: /Users/z/polinavite/src/assets/images/presentations


### Файл: /Users/z/polinavite/src/assets/images/presentations/1-1.png (1.68 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentations/1-1.png (1.68 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/presentations/1-2.png (2.99 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentations/1-2.png (2.99 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/presentations/1-3.png (874.88 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentations/1-3.png (874.88 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/presentations/2-1.png (1.56 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentations/2-1.png (1.56 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/presentations/2-2.png (205.44 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentations/2-2.png (205.44 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/presentations/2-3.png (2.49 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentations/2-3.png (2.49 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/presentations/2-4.png (1.66 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentations/2-4.png (1.66 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/presentations/2-5.png (204.79 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentations/2-5.png (204.79 КБ)]

### Файл: /Users/z/polinavite/src/assets/images/presentations/3-1.png (2.66 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentations/3-1.png (2.66 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/presentations/3-2.png (2.70 МБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/presentations/3-2.png (2.70 МБ)]

### Файл: /Users/z/polinavite/src/assets/images/rings_with_circle.svg (1.66 КБ)
```svg
<svg width="276" height="299" viewBox="0 0 276 299" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.07">
<path d="M99.1177 196.835C142.961 196.835 178.635 160.93 178.635 116.802C178.635 72.673 142.961 36.7676 99.1177 36.7676C55.2742 36.7676 19.6007 72.673 19.6007 116.802C19.6007 160.93 55.2742 196.835 99.1177 196.835ZM99.1177 41.2513C140.511 41.2513 174.18 75.139 174.18 116.802C174.18 158.464 140.511 192.352 99.1177 192.352C57.7243 192.352 24.0554 158.464 24.0554 116.802C24.0554 75.139 57.7243 41.2513 99.1177 41.2513Z" fill="white"/>
<path d="M176.777 298.809C231.486 298.809 276 253.783 276 198.446C276 143.108 231.486 98.082 176.777 98.082C122.068 98.082 77.5539 143.108 77.5539 198.446C77.5539 253.783 122.068 298.809 176.777 298.809ZM176.777 103.705C228.429 103.705 270.441 146.2 270.441 198.446C270.441 250.691 228.429 293.187 176.777 293.187C125.125 293.187 83.1126 250.691 83.1126 198.446C83.1126 146.2 125.125 103.705 176.777 103.705Z" fill="white"/>
<path d="M59.0255 118.818C91.5718 118.818 118.051 92.1668 118.051 59.4089C118.051 26.6511 91.5718 0 59.0255 0C26.4792 0 0.000267029 26.6511 0.000267029 59.4089C0.000267029 92.1668 26.4792 118.818 59.0255 118.818ZM59.0255 4.48369C89.1128 4.48369 113.596 29.1261 113.596 59.4089C113.596 89.6918 89.1128 114.334 59.0255 114.334C28.9382 114.334 4.455 89.6918 4.455 59.4089C4.455 29.1261 28.9382 4.48369 59.0255 4.48369Z" fill="white"/>
</g>
<circle cx="59" cy="56" r="42" fill="url(#paint0_linear_3874_1192)"/>
<defs>
<linearGradient id="paint0_linear_3874_1192" x1="59" y1="14" x2="59" y2="98" gradientUnits="userSpaceOnUse">
<stop stop-color="#3624A6"/>
<stop offset="1" stop-color="#150E40"/>
</linearGradient>
</defs>
</svg>

```

### Файл: /Users/z/polinavite/src/assets/images/threads.png (415.42 КБ)
[Бинарный файл: /Users/z/polinavite/src/assets/images/threads.png (415.42 КБ)]

### Файл: /Users/z/polinavite/src/assets/main.css (1.57 КБ)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'MV-SKIFER';
  src: url('@assets/fonts/MV-SKIFER.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Onest';
  src: url('@assets/fonts/Onest-Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Onest';
  src: url('@assets/fonts/Onest-ExtraLight.ttf') format('truetype');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Onest';
  src: url('@assets/fonts/Onest-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Onest';
  src: url('@assets/fonts/Onest-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Onest';
  src: url('@assets/fonts/Onest-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

:root {
  font-size: clamp(4.27px, calc(100vw / 75), 16px);
}

html {
  overscroll-behavior: contain;
  background-color: #04061B;
}

.modal-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #3624A6 transparent;
}

.modal-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.modal-scrollbar::-webkit-scrollbar-track {
  background: #3624A6;
}

.modal-scrollbar::-webkit-scrollbar-thumb {
  background: #4A5568;
  border-radius: 4px;
}

.object-cover {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: static;
}
```

## Директория: /Users/z/polinavite/src/components


### Файл: /Users/z/polinavite/src/components/ErrorBoundary.jsx (2.80 КБ)
```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Увеличиваем счетчик ошибок
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Отправка ошибки в сервис мониторинга (если будет добавлен)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Если произошло слишком много ошибок, показываем сообщение о перезагрузке
      if (this.state.errorCount > 3) {
        return (
          <div className="flex h-screen w-full items-center justify-center bg-primary text-white">
            <div className="text-center p-8 max-w-lg">
              <h1 className="text-2xl font-bold mb-4">
                Произошла критическая ошибка
              </h1>
              <p className="mb-4">
                Пожалуйста, перезагрузите страницу для продолжения работы.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-secondary rounded-lg font-medium 
                         hover:bg-opacity-80 transition-colors"
              >
                Перезагрузить страницу
              </button>
            </div>
          </div>
        );
      }

      // Для некритичных ошибок показываем кнопку повтора
      return (
        <div className="flex h-screen w-full items-center justify-center bg-primary text-white">
          <div className="text-center p-8 max-w-lg">
            <h1 className="text-2xl font-bold mb-4">
              Что-то пошло не так
            </h1>
            <p className="mb-4">
              Произошла ошибка при загрузке компонента.
            </p>
            <button
              onClick={this.handleRetry}
              className="px-6 py-2 bg-secondary rounded-lg font-medium 
                       hover:bg-opacity-80 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Директория: /Users/z/polinavite/src/components/features


## Директория: /Users/z/polinavite/src/components/features/Experience


### Файл: /Users/z/polinavite/src/components/features/Experience/ExperienceItem.jsx (1.65 КБ)
```jsx
import React from 'react';

const ExperienceItem = ({ experience }) => {
  const { year, company, position, duties, circleImage } = experience;
  return (
    <div className="ml-[30.1025rem] md:ml-[31.875rem] mb-[7.21875rem] md:mb-[4.8125rem]">
      <div className="relative">
        {circleImage && (
          <div className="absolute -top-[1.40625rem] md:-top-[0.9375rem] -left-[12.375rem] md:-left-[8.25rem] w-[7.875rem] md:w-[5.25rem] h-[7.875rem] md:h-[5.25rem]">
            <img src={circleImage} alt="" className="w-full h-full object-contain" />
          </div>
        )}
        <div>
          <p className="mb-[0.1875rem] md:mb-[0.125rem] font-extralight font-onest text-[3.28125rem] md:text-[2.1875rem] leading-[1.33] tracking-[0.01em]">
            {year}
          </p>
          <h3 className="mb-[0.65625rem] md:mb-[0.4375rem] font-medium font-onest text-[3.28125rem] md:text-[2.1875rem] leading-[1.25] tracking-[0.01em]">
            {company}
          </h3>
          <h3 className="mb-[0.65625rem] md:mb-[0.4375rem] font-medium font-onest text-[3.28125rem] md:text-[2.1875rem] leading-[1.33] tracking-[0.01em]">
            {position}
          </h3>
          <ul className="font-extralight text-[3.28125rem] md:text-[2.1875rem] list-none relative">
            {duties.map((duty, index) => (
              <li key={index} className="mb-[0.75rem] md:mb-[0.5rem]">
                <span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">
                  &rarr;
                </span>
                {duty}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;
```

### Файл: /Users/z/polinavite/src/components/features/Experience/ExperienceSection.jsx (1.39 КБ)
```jsx
// src/components/features/Experience/ExperienceSection.jsx
import React from 'react';
import { ExperienceItem } from '@features/Experience';
import circle from '@images/kruzhok_opyt_raboty.svg';
import buttonCircle from '@images/koltsa_fon1.svg';

const ExperienceSection = () => {
  const experienceData = [
    {
      year: '2023-2024',
      company: 'Центр Педагогического Мастерства',
      position: 'Графический дизайнер',
      duties: ['Фирменный стиль', 'SMM-дизайн (соцсети)', 'Презентации', 'Полиграфия'],
      circleImage: circle,
    },
    {
      year: '2021-2022',
      company: 'Банк УБРиР',
      position: 'Ведущий дизайнер отдела коммуникаций',
      duties: ['Презентации', 'Коммуникационный дизайн', 'Полиграфия'],
    },
  ];

  return (
    <section className="relative mx-auto px-4 py-[0.75rem] max-w-[75rem]">
      <div className="absolute top-3/4 left-1/2 w-[56rem] md:w-auto -translate-x-[35.7rem] md:-translate-x-[23rem] overflow-hidden">
        <img src={buttonCircle} alt="" className="w-full h-full object-contain" />
      </div>

      {experienceData.map((item) => (
        <ExperienceItem key={item.year} experience={item} />
      ))}
    </section>
  );
};

export default ExperienceSection;
```

### Файл: /Users/z/polinavite/src/components/features/Experience/index.js (176 байт)
```js
// src/components/features/Experience/index.js
export { default as ExperienceItem } from './ExperienceItem';
export { default as ExperienceSection } from './ExperienceSection';
```

## Директория: /Users/z/polinavite/src/components/features/Modal


### Файл: /Users/z/polinavite/src/components/features/Modal/ModalHeader.jsx (1.08 КБ)
```jsx
import React from "react";

const ModalHeader = ({ project }) => {
  // Если project отсутствует или нет ни одного поля - не рендерим компонент
  if (!project || !(project.title || project.description || project.audience)) {
    return null;
  }

  return (
    <header className="space-y-[2.8125rem] md:space-y-[1.875rem] mb-8">
      <div>
        {project.title && (
          <h3 className="font-mv-skifer text-[4.6875rem] md:text-[3.125rem]">
            {project.title}
          </h3>
        )}

        {project.description && (
          <h4 className="mb-4 font-extralight text-[3.28125rem] md:text-2xl leading-normal">
            {project.description}
          </h4>
        )}

        {project.audience && (
          <p className="font-onest text-[3.28125rem] md:text-[1.25rem]">
            <span className="font-semibold">Целевая аудитория: </span>
            <span className="opacity-80">{project.audience}</span>
          </p>
        )}
      </div>
    </header>
  );
};

export default React.memo(ModalHeader);
```

### Файл: /Users/z/polinavite/src/components/features/Modal/ModalSlider.jsx (3.90 КБ)
```jsx
// src/components/features/Modal/ModalSlider.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { observer } from '@legendapp/state/react';
import { navigationStore } from '@/stores/navigationStore';
import { SliderImage, NavigationButtons } from './components';
import { imageService } from '@/services';

const ModalSlider = observer(({ slides }) => {
  const currentIndex = navigationStore.useCurrentSlide();
  const direction = navigationStore.useDirection();
  const [isLoading, setIsLoading] = useState(true);

  // Предзагрузка всех изображений при монтировании компонента
  React.useEffect(() => {
    if (slides?.length > 0) {
      navigationStore.setTotalSlides(slides.length);
      
      const imageUrls = slides.map(slide => slide.image);
      
      // Предзагружаем все изображения
      setIsLoading(true);
      imageService.preloadImages(imageUrls, { 
        concurrency: 3, // Загружаем по 3 изображения одновременно
        priority: true 
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to preload images:', error);
        setIsLoading(false);
      });
    }

    return () => {
      navigationStore.reset();
    };
  }, [slides]);

  const handleNavigation = (direction) => {
    if (!isLoading) {
      direction === 'next' 
        ? navigationStore.nextSlide()
        : navigationStore.prevSlide();
    }
  };

  if (!slides?.length) return null;

  const variants = {
    enter: (direction) => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction === 'right' ? -1000 : 1000,
      opacity: 0
    })
  };

  const currentSlide = slides[currentIndex] || {};

  return (
    <div className="slider w-full max-w-[93.75rem] mx-auto overflow-hidden group relative">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-primary/80">
          <div className="text-white/80 text-xl">Загрузка изображений...</div>
        </div>
      )}
      
      <AnimatePresence 
        initial={false} 
        mode="wait" 
        custom={direction}
      >
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="relative w-full"
        >
          {/* Контейнер для изображения */}
          <div className="overflow-hidden">
            <SliderImage
              src={currentSlide.image}
              index={currentIndex}
              priority={true}
            />
          </div>

          {/* Контент */}
          <div className="px-8 pb-8">
            <NavigationButtons 
              onNavigate={handleNavigation}
              disabled={isLoading}
            />

            <div className="font-onest text-[3.28125rem] md:text-[1.25rem] space-y-4">
              {currentSlide.task && (
                <p>
                  <span className="font-semibold">Задача: </span>
                  <span className="opacity-80">{currentSlide.task}</span>
                </p>
              )}
              {currentSlide.solution && (
                <p>
                  <span className="font-semibold">Решение: </span>
                  <span className="opacity-80">{currentSlide.solution}</span>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default ModalSlider;
```

### Файл: /Users/z/polinavite/src/components/features/Modal/ProjectModal.jsx (2.92 КБ)
```jsx
// src/components/features/Modal/ProjectModal.jsx
import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalHeader } from '@features/Modal';
import { ModalSlider } from '@features/Modal';
import { modalStore } from '@stores';

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

const ProjectModal = ({ project, onClose }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'ArrowRight') {
      modalStore.nextSlide();
    } else if (e.key === 'ArrowLeft') {
      modalStore.prevSlide();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!project?.slides?.length) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={ANIMATION_VARIANTS}
      onClick={handleClose}
    >
      <motion.div
        className="relative w-full max-w-7xl mx-auto my-4 bg-primary border border-white/10 rounded-[1.875rem] md:rounded-[1.25rem] shadow-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        layoutId={`project-${project.id}`}
      >
        <div className="h-[90vh] overflow-y-auto modal-scrollbar">
          <div className="p-[3.75rem] md:p-[2.5rem]">
            <ModalHeader project={project} />
            <ModalSlider slides={project.slides} />
          </div>
        </div>

        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-4 md:p-2 rounded-full 
                     bg-black/40 backdrop-blur-sm 
                     hover:bg-black/60 
                     focus:outline-none focus:ring-2 focus:ring-white/50
                     z-50 group
                     transition-all duration-300 ease-in-out
                     shadow-lg"
          aria-label="Закрыть"
        >
          <svg
            className="w-12 h-12 md:w-6 md:h-6 text-white/80 group-hover:text-white
                       transition-colors duration-300 ease-in-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(ProjectModal);
```

## Директория: /Users/z/polinavite/src/components/features/Modal/components


### Файл: /Users/z/polinavite/src/components/features/Modal/components/NavigationButtons.jsx (1.10 КБ)
```jsx
import React from 'react';

const NavigationButtons = ({ onNavigate, disabled = false }) => {
  const baseButtonStyle = `
    border transition-all duration-300 rounded-full 
    flex items-center justify-center 
    text-7xl w-[5rem] h-[5rem] 
    border-white/20 
    md:w-[3rem] md:h-[3rem] md:text-5xl
  `;

  const enabledStyles = "hover:bg-white hover:text-[#3624A6] cursor-pointer active:scale-95 transform";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonStyle = `${baseButtonStyle} ${disabled ? disabledStyles : enabledStyles}`;

  return (
    <div className="flex justify-center space-x-6 my-6">
      <button
        onClick={() => !disabled && onNavigate('prev')}
        className={buttonStyle}
        aria-label="Предыдущий слайд"
        disabled={disabled}
      >
        &larr;
      </button>

      <button
        onClick={() => !disabled && onNavigate('next')}
        className={buttonStyle}
        aria-label="Следующий слайд"
        disabled={disabled}
      >
        &rarr;
      </button>
    </div>
  );
};

export default NavigationButtons;
```

### Файл: /Users/z/polinavite/src/components/features/Modal/components/SliderImage.jsx (1.08 КБ)
```jsx
// src/components/features/Modal/components/SliderImage.jsx
import React from 'react';
import { useSelector } from '@legendapp/state/react';
import { Skeleton } from '@ui';
import { IMAGE_STYLES } from '@constants/styles';
import { imageService } from '@services';

const SliderImage = ({ src, alt, priority = false }) => {
  const status = useSelector(() => imageService.status$.get());
  const retryCount = useSelector(() => imageService.retryCount$.get());

  React.useEffect(() => {
    if (src) {
      imageService.loadImage(src);
    }
  }, [src]);

  return (
    <div className={IMAGE_STYLES.CONTAINER}>
      {status === 'loading' && <Skeleton />}

      {status === 'error' && (
        <div className={IMAGE_STYLES.ERROR}>
          Ошибка загрузки (попыток: {retryCount})
        </div>
      )}

      {status === 'loaded' && (
        <img
          src={src}
          alt={alt}
          className={IMAGE_STYLES.IMAGE}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  );
};

export default React.memo(SliderImage);
```

### Файл: /Users/z/polinavite/src/components/features/Modal/components/SliderImage.test.jsx (1.87 КБ)
```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import SliderImage from './SliderImage';
import { imageService } from '@services';

// Мок для imageService
jest.mock('@services', () => ({
  imageService: {
    status$: {
      get: jest.fn()
    },
    retryCount$: {
      get: jest.fn()
    },
    loadImage: jest.fn()
  }
}));

describe('SliderImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('показывает Skeleton при загрузке', () => {
    imageService.status$.get.mockReturnValue('loading');
    
    render(<SliderImage src="test.jpg" alt="test" />);
    
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  test('показывает сообщение об ошибке при неудачной загрузке', () => {
    imageService.status$.get.mockReturnValue('error');
    imageService.retryCount$.get.mockReturnValue(3);
    
    render(<SliderImage src="test.jpg" alt="test" />);
    
    expect(screen.getByText(/Ошибка загрузки/)).toBeInTheDocument();
    expect(screen.getByText(/попыток: 3/)).toBeInTheDocument();
  });

  test('показывает изображение после успешной загрузки', () => {
    imageService.status$.get.mockReturnValue('loaded');
    
    render(<SliderImage src="test.jpg" alt="test" />);
    
    const img = screen.getByAltText('test');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  test('использует eager loading при priority=true', () => {
    imageService.status$.get.mockReturnValue('loaded');
    
    render(<SliderImage src="test.jpg" alt="test" priority={true} />);
    
    const img = screen.getByAltText('test');
    expect(img).toHaveAttribute('loading', 'eager');
  });
});
```

### Файл: /Users/z/polinavite/src/components/features/Modal/components/index.js (165 байт)
```js
// src/components/features/Modal/index.js
export { default as NavigationButtons } from './NavigationButtons';
export { default as SliderImage } from './SliderImage';
```

### Файл: /Users/z/polinavite/src/components/features/Modal/index.js (211 байт)
```js
// src/components/features/Modal/index.js
export { default as ModalHeader } from './ModalHeader';
export { default as ProjectModal } from './ProjectModal';
export { default as ModalSlider } from './ModalSlider';
```

## Директория: /Users/z/polinavite/src/components/features/Portfolio


### Файл: /Users/z/polinavite/src/components/features/Portfolio/PortfolioCard.jsx (1.46 КБ)
```jsx
// src/components/features/Portfolio/PortfolioCard.jsx
import React, { useCallback } from 'react';
import { CARD_STYLES } from '@constants/styles';
import ProgressiveImage from '@/components/ui/ProgressiveImage';

/**
 * Компонент карточки портфолио
 * @param {Object} props - Свойства компонента
 * @param {Object} props.project - Данные проекта
 * @param {string} props.project.id - Уникальный идентификатор проекта
 * @param {string} props.project.image - Импортированное изображение проекта
 * @param {string} props.project.alt - Альтернативный текст для изображения
 * @param {Function} props.onClick - Обработчик клика по карточке
 */
const PortfolioCard = ({ project, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(project.id);
  }, [onClick, project.id]);

  return (
    <button
      type="button"
      className={CARD_STYLES.CONTAINER}
      onClick={handleClick}
      aria-label={`Открыть проект: ${project.alt}`}
    >
      <ProgressiveImage 
        src={project.image} 
        alt={project.alt} 
        className={CARD_STYLES.IMAGE}
      />
    </button>
  );
};

export default React.memo(PortfolioCard, (prevProps, nextProps) => {
  return prevProps.project.id === nextProps.project.id && 
         prevProps.project.image === nextProps.project.image;
});
```

### Файл: /Users/z/polinavite/src/components/features/Portfolio/PortfolioSection.jsx (1.57 КБ)
```jsx
// src/components/features/Portfolio/PortfolioSection.jsx
import React, { useCallback } from 'react';
import { PortfolioCard } from '@features/Portfolio';
import { SECTION_STYLES } from '@constants/styles';
import { portfolioData} from '@/constants/portfolioData';

// Импортируем изображения
import rings from '@images/rings_with_circle.svg';

/**
 * Секция портфолио, отображающая сетку проектов
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onCardClick - Обработчик клика по карточке
 */
const PortfolioSection = ({ onCardClick }) => {
  

  // Мемоизируем обработчик клика
  const handleCardClick = useCallback((id) => {
    onCardClick?.(id);
  }, [onCardClick]);

  return (
    <section className={SECTION_STYLES.CONTAINER}>
      <div className={SECTION_STYLES.HEADER_WRAPPER}>
        <div className={SECTION_STYLES.DECORATION}>
          <img 
            src={rings}
            alt="Декоративные кольца" 
            className={SECTION_STYLES.DECORATION_IMAGE}
            loading="eager"
          />
        </div>
        <h2 className={SECTION_STYLES.TITLE}>Портфолио</h2>
      </div>

      <div className={SECTION_STYLES.GRID}>
        {portfolioData.map((project) => (
          <PortfolioCard
            key={project.id}
            project={project}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(PortfolioSection);
```

### Файл: /Users/z/polinavite/src/components/features/Portfolio/index.js (171 байт)
```js
// src/components/features/Portfolio/index.js
export { default as PortfolioCard } from './PortfolioCard';
export { default as PortfolioSection } from './PortfolioSection';
```

## Директория: /Users/z/polinavite/src/components/features/Resume


### Файл: /Users/z/polinavite/src/components/features/Resume/ResumeSection.jsx (3.74 КБ)
```jsx
// src/components/features/Resume/ResumeSection.jsx
import React from 'react';
import bigrings from "@images/portfolio.svg";
import foto from "@images/foto.png";
import rings from "@images/rings_with_circle.svg";

const ResumeSection = () => {
    return (
        <section className="relative mx-auto px-4 py-[3.75rem] max-w-[75rem]">
            <div className="absolute left-1/2 top-[40.5rem] md:top-[27rem] w-[48.78125rem] overflow-hidden -translate-x-[16rem] md:-translate-x-[16rem]">
                <img src={bigrings} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="relative mb-[1.25rem] text-center">
                <div
                    className="absolute top-[-2.875rem] md:top-[-1.875rem] left-[50%] w-[25.875rem] md:w-[17.25rem] h-[28.0125rem] md:h-[18.675rem] transform -translate-x-[14.7rem] md:-translate-x-[9.8rem]"
                >
                    <img src={rings} alt="Декоративные кольца" className="w-full h-full object-contain" />
                </div>
                <h2 className="font-mv-skifer text-[4.6875rem] md:text-[3.125rem] leading-[1.24] tracking-[0.01em] relative">
                    Резюме
                </h2>
            </div>

            <div className="flex justify-center items-center gap-[1.875rem] md:gap-[1.25rem] mb-[1.25rem]">
                <div className="rounded-full w-[16.6875rem] md:w-[11.125rem] h-[17.25rem] md:h-[11.55rem]">
                    <img src={foto} alt="Полина Мигранова" className="relative w-full h-full object-cover" />
                </div>
                <h3 className="font-mv-skifer text-[4.6875rem] md:text-[3.125rem] leading-[1.05] tracking-[0.01em]">
                    Полина<br />Мигранова
                </h3>
            </div>

            <div className="ml-[29.8125rem] md:ml-[31.875rem]">
                <div className="mb-[5.5rem] md:mb-[3rem]">
                    <h3 className="mb-[0.84375rem] md:mb-[0.5625rem] font-medium font-onest text-[3.75rem] md:text-[2.5rem]">
                        Hard skills
                    </h3>
                    <ul className="font-extralight text-[3.28125rem] md:text-[2.1875rem] list-none relative">
                        <li className="mb-[0.75rem] md:mb-[0.1rem]"><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> PowerPoint</li>
                        <li className="mb-[0.75rem] md:mb-[0.1rem]"><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Figma</li>
                        <li><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Photoshop,<br />Illustrator, InDesign</li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-[0.84375rem] md:mb-[0.5625rem] font-medium font-onest text-[3.75rem] md:text-[2.5rem]">
                        Soft skills
                    </h3>
                    <ul className="font-extralight text-[3.28125rem] md:text-[2.1875rem] list-none relative">
                        <li className="mb-[0.75rem] md:mb-[0.1rem]"><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Системность</li>
                        <li className="mb-[0.75rem] md:mb-[0.1rem]"><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Креативность</li>
                        <li><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Ответственность</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default ResumeSection;
```

### Файл: /Users/z/polinavite/src/components/features/Resume/index.js (102 байт)
```js
// src/components/features/Resume/index.js
export { default as ResumeSection } from './ResumeSection';
```

## Директория: /Users/z/polinavite/src/components/ui


### Файл: /Users/z/polinavite/src/components/ui/Footer.jsx (1.76 КБ)
```jsx
// src/components/ui/Footer.jsx
/**
 * Компонент подвала сайта с контактной информацией
 * @component
 * @returns {React.ReactElement} Компонент с контактной информацией и ссылками
 */

import React from 'react';
import buttonCircle from '@images/koltsa_fon1.svg';

const Footer = () => {
    const telegram = "https://t.me/Migranovap";
    return (
        <footer className="relative mt-[12.375rem] md:mt-[9.75rem] pb-[30.9375rem] md:pb-[20.625rem]">
            <div className="absolute -top-96 left-1/2 w-[56rem] md:w-[40rem] -translate-x-[36rem] md:-translate-x-[24.5rem] -translate-y-[13rem] md:-translate-y-[3rem] overflow-hidden">
                <img src={buttonCircle} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="mx-auto px-4 max-w-[75rem] relative">
                <a
                    href={telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center bg-white text-[#3624A6] hover:text-white mx-auto md:ml-[25.375rem] rounded-[3.65625rem] md:rounded-[2.4375rem] w-[36.375rem] md:w-[24.25rem] h-[7.3125rem] md:h-[4.875rem] font-medium font-onest text-[3.75rem] md:text-[2.5rem] text-center leading-tight tracking-[0.01em] transition-[background,color] duration-700 ease-in-out hover:bg-gradient-to-t hover:from-[#1C1257] hover:to-[#312098]"
                >
                    <span className="relative">
                        связаться
                    </span>
                    <span className="sr-only">Связаться со мной в Telegram</span>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
```

### Файл: /Users/z/polinavite/src/components/ui/Header.jsx (1.96 КБ)
```jsx
// src/components/ui/Header.jsx
/**
 * Компонент заголовка сайта
 * @component
 * @returns {React.ReactElement} Компонент с логотипом и заголовком
 */

import React from 'react';
import logo from "@images/logo.svg";

// Вынесенные константы стилей
const HEADER_STYLES = {
  CONTAINER: "relative mx-auto px-4 py-[3.75rem] max-w-[75rem]",
  LOGO: "h-[12rem] md:h-[8rem] w-auto object-contain",
  TITLE_PRIMARY: "font-mv-skifer text-[7.3125rem] md:text-[4.875rem] leading-none",
  TITLE_SECONDARY: "font-light font-onest text-[2.25rem] md:text-[1.5rem] leading-tight tracking-wider",
  LAYOUT: {
    WRAPPER: "flex justify-center items-center",
    INNER: "flex items-center gap-[2rem]",
    TEXT_CONTAINER: "flex flex-col text-left whitespace-nowrap",
    TITLE_ROW: "flex items-center gap-[1.5rem]"
  }
};

const Header = () => {

  return (
    <header className={HEADER_STYLES.CONTAINER}>
      <div className={HEADER_STYLES.LAYOUT.WRAPPER}>
        <div className={HEADER_STYLES.LAYOUT.INNER}>
          {/* Логотип */}
          <div className={HEADER_STYLES.LOGO}>
            <img 
              src={logo} 
              alt="Логотип Полина Мигранова" 
              className="w-full h-full"
            />
          </div>

          {/* Текстовый блок */}
          <div className={HEADER_STYLES.LAYOUT.TEXT_CONTAINER}>
            <div className={HEADER_STYLES.LAYOUT.TITLE_ROW}>
              <h1 className={HEADER_STYLES.TITLE_PRIMARY}>
                Полина
              </h1>
              <div className={HEADER_STYLES.TITLE_SECONDARY}>
                графический<br />дизайнер
              </div>
            </div>
            
            <h1 className={HEADER_STYLES.TITLE_PRIMARY}>
              Мигранова
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
```

### Файл: /Users/z/polinavite/src/components/ui/ProgressiveImage.jsx (3.43 КБ)
```jsx
// src/components/ui/ProgressiveImage.jsx
/**
 * Компонент для постепенной загрузки изображений с поддержкой анимации и состояний загрузки
 * @component
 * @param {Object} props - Свойства компонента
 * @param {string} props.src - URL изображения для загрузки
 * @param {string} props.alt - Альтернативный текст для изображения
 * @param {string} [props.className] - Дополнительные CSS классы
 * @param {boolean} [props.priority=false] - Флаг приоритетной загрузки
 * @returns {React.ReactElement} Компонент с изображением и состояниями загрузки
 */

import React from 'react';
import { observable } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@ui';
import { imageService } from '@services';

// Создаем observable состояние
const imageState = observable({ isLoaded: false });

const ProgressiveImage = observer(({ 
  src, 
  alt, 
  className = '', 
  priority = false 
}) => {
  const status = imageService.status$.get();
  const retryCount = imageService.retryCount$.get();

  // Обработчик успешной загрузки
  const handleLoad = () => {
    imageState.isLoaded.set(true);
  };

  React.useEffect(() => {
    if (src) {
      imageService.loadImage(src);
    }
    return () => {
      imageState.isLoaded.set(false);
    };
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden isolate">
      <AnimatePresence mode="wait">
        {/* Skeleton при загрузке */}
        {(status === 'loading' || status === 'retrying') && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Skeleton animation="pulse" />
          </motion.div>
        )}

        {/* Сообщение об ошибке */}
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 text-red-500">
              Ошибка загрузки (попыток: {retryCount})
            </div>
          </motion.div>
        )}

        {/* Изображение */}
        {status === 'loaded' && (
          <motion.div
            key="image"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ 
              opacity: imageState.isLoaded.get() ? 1 : 0,
              filter: imageState.isLoaded.get() ? 'blur(0px)' : 'blur(10px)'
            }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <img 
              src={src}
              alt={alt}
              className={`w-full h-full transition-opacity duration-300 ${className}`}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              onLoad={handleLoad}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default React.memo(ProgressiveImage);
```

### Файл: /Users/z/polinavite/src/components/ui/Skeleton.jsx (2.59 КБ)
```jsx
// src/components/ui/Skeleton.jsx
/**
 * Компонент для отображения состояния загрузки с поддержкой анимации
 * @component
 * @param {Object} props
 * @param {string} [props.className] - Дополнительные CSS классы
 * @param {('default'|'circle'|'text')} [props.variant='default'] - Вариант отображения
 * @param {('pulse'|'wave'|'none')} [props.animation='pulse'] - Тип анимации
 * @returns {React.ReactElement} Компонент-заглушка с анимацией
 */

import React from 'react';

/**
 * Компонент Skeleton с поддержкой анимации и различных размеров
 * @param {Object} props
 * @param {string} [props.className] - Дополнительные классы
 * @param {string} [props.variant='default'] - Вариант скелетона ('default', 'circle', 'text')
 * @param {string} [props.animation='pulse'] - Тип анимации ('pulse', 'wave', 'none')
 */
const Skeleton = ({ 
  className = '',
  variant = 'default',
  animation = 'pulse'
}) => {
  const baseClasses = 'relative overflow-hidden rounded-[1.875rem] md:rounded-[1.25rem]';
  
  const variantClasses = {
    default: 'h-full w-full min-h-[31rem]',
    circle: 'rounded-full',
    text: 'h-4 w-3/4'
  };

  const animationClasses = {
    pulse: 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent',
    wave: 'animate-pulse',
    none: ''
  };

  const bgClass = 'bg-white/[0.03]';

  return (
    <div 
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${bgClass}
        ${className}
      `}
    >
      <div className="grid h-full w-full place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-12 w-12 text-white/10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default React.memo(Skeleton);
```

### Файл: /Users/z/polinavite/src/components/ui/index.js (238 байт)
```js
// src/components/ui/index.js
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as Skeleton } from './Skeleton';
export { default as ProgressiveImage } from './ProgressiveImage';

```

## Директория: /Users/z/polinavite/src/constants


### Файл: /Users/z/polinavite/src/constants/portfolioData.js (568 байт)
```js
// Импортируем изображения обложек
import nitiImage from '@images/threads.png';
import codeImage from '@images/code.png';
import fizicsImage from '@images/day.png';
import presentationImage from '@images/presentation.png';

export const portfolioData = [
  { id: 'project1', image: nitiImage, alt: "НИТИ" },
  { id: 'project2', image: codeImage, alt: "КОДИИМ" },
  { id: 'project3', image: fizicsImage, alt: "День физики" },
  { id: 'project4', image: presentationImage, alt: "Дизайн презентаций" },
];
```

### Файл: /Users/z/polinavite/src/constants/projectsData.js (14.95 КБ)
```js
import nitiSlide1 from "@images/niti/niti1.png";
import nitiSlide2 from "@images/niti/niti2.png";
import nitiSlide3 from "@images/niti/niti3.png";
import nitiSlide4 from "@images/niti/niti4.png";
import nitiSlide5 from "@images/niti/niti5.png";
import codeEventDesign from "@images/code/code1.png";
import codeBootcampMerch from "@images/code/code2.png";
import codeSmmMaterials from "@images/code/code3.png";
import codePlaceholder from "@images/code/code4.png";
import fizicsPostcard from "@images/fizics/fizics1.png";
import fizicsCards from "@images/fizics/fizics2.png";
import fizicsPlaceholder from "@images/fizics/fizics3.png";
import presentation11 from "@images/presentations/1-1.png";
import presentation12 from "@images/presentations/1-2.png";
import presentation13 from "@images/presentations/1-3.png";
import presentation21 from "@images/presentations/2-1.png";
import presentation22 from "@images/presentations/2-2.png";
import presentation23 from "@images/presentations/2-3.png";
import presentation24 from "@images/presentations/2-4.png";
import presentation25 from "@images/presentations/2-5.png";
import presentation31 from "@images/presentations/3-1.png";
import presentation32 from "@images/presentations/3-2.png";

export const projects = [
  {
    id: "project1",
    title: "НИТИ",
    description: "Кластер проектов по управлению современным образованием",
    audience:
      "менеджеры образования, управленцы, преимущественно женщины старше 40",
    slides: [
      {
        image: nitiSlide1,
        task: "ребрендинг образовательного продукта, создание айдентики, гармонично сочетающей эстетику с глубоким смысловым содержанием. Основной акцент на женственность, лидерство и стремление к профессиональному росту",
        solution: "цветовая палитра создает ощущение серьезного подхода к вызовам современного образования. Возраст целевой аудитории определяет использование цветов с более короткой длиной волны (выбран синий, использовался и ранее, но изменены оттенки и градиенты). Новые элементы айдентики подчеркивают глубину образовательного материала",
      },
      {
        image: nitiSlide2,
        task: "ребрендинг образовательного продукта, создание айдентики, гармонично сочетающей эстетику с глубоким смысловым содержанием. Основной акцент на женственность, лидерство и стремление к профессиональному росту",
        solution:
          "цветовая палитра создает ощущение серьезного подхода к вызовам современного образования. Возраст целевой аудитории определяет использование цветов с более короткой длиной волны (выбран синий, использовался и ранее, но изменены оттенки и градиенты). Новые элементы айдентики подчеркивают глубину образовательного материала",
      },
      {
        image: nitiSlide3,
        task: "разработка мерча для мероприятия",
        solution: "цветовая палитра создает ощущение серьезного подхода к вызовам современного образования. Возраст целевой аудитории определяет использование цветов с более короткой длиной волны (выбран синий, использовался и ранее, но изменены оттенки и градиенты). Новые элементы айдентики подчеркивают глубину образовательного материала",
      },
      {
        image: nitiSlide4,
        task: "создание smm-материалов (карточек)",
        solution: "разработка основных элементов фирменного стиля (сохранение общих моментов и введение разнообразия для привлечения внимания), расстановка акцентов для выделения существенной информации",
      },
      {
        image: nitiSlide5,
        task: "создание smm-материалов (карточек)",
        solution: "разработка основных элементов фирменного стиля (сохранение общих моментов и введение разнообразия для привлечения внимания), расстановка акцентов для выделения существенной информации",
      },
    ],
  },
  {
    id: "project2",
    title: "КОДИИМ",
    description:
      "Проект по искусственному интеллекту, обучению программированию и созданию нейронных сетей",
    audience: "учащиеся 6-11 классов, интересующиеся программированием и ИИ",
    slides: [
      {
        image: codeEventDesign,
        task: "оформление ивента — Московского городского конкурса для школьников в области ИИ (мерча для подарков победителям и призерам)",
        solution:
          "современная подача, цветовые отличия в бейджах, палитра отражает технологичность бренда",
      },
      {
        image: codeBootcampMerch,
        task: "создать уникальный и запоминающийся мерч для буткемпа по ИИ",
        solution:
          "в разработке мерча реализован уникальный подход: смыслы мероприятия представлены как код в программировании",
      },
      {
        image: codeSmmMaterials,
        task: "редизайн smm-материалов",
        solution:
          "разнообразие цветов, активное использование нейросетей для генерации иллюстраций и персонажей",
      },
      {
        image: codePlaceholder,
        task: "редизайн smm-материалов",
        solution: "разнообразие цветов, активное использование нейросетей для генерации иллюстраций и персонажей",
      },
    ],
  },
  {
    id: "project3",
    title: "День физики",
    description:
      "Мероприятие состоялось 17 сентября 2023 года в день рождения Циолковского на базе вузов в 22 городах страны",
    audience: "старшеклассники, интересующиеся наукой, выбирают будущую профессию",
    slides: [
      {
        image: fizicsPostcard,
        task: "разработать карточки для игры «Технообмен» в айдентике бренда, но с указанными новыми цветами. Участники получали карточки в обмен на выполнение заданий",
        solution:
          "изучить биографии российских и советских учёных. Было важно показать, что теоретические открытия не самоцель, наука призвана решать конкретные практические задачи. Так родилась идея написать тексты об открытиях на обороте и добавлять надпись «НАУКА=ТЕОРИЯ+ПРАКТИКА». Цитаты учёных были подобраны для трансляции ценностей об отношении к профессии, труду и обществу",
      },
      {
        image: fizicsCards,
        task: "разработать макет открыток с российскими физиками, используя айдентику мероприятия",
        solution: "изучить биографии российских и советских учёных. Было важно показать, что теоретические открытия не самоцель, наука призвана решать конкретные практические задачи. Так родилась идея написать тексты об открытиях на обороте и добавлять надпись «НАУКА=ТЕОРИЯ+ПРАКТИКА». Цитаты учёных были подобраны для трансляции ценностей об отношении к профессии, труду и обществу",
      },
      {
        image: fizicsPlaceholder,
        task: "разработать карточки для игры «Технообмен» в айдентике бренда, но с указанными новыми цветами. Участники получали карточки в обмен на выполнение заданий",
        solution: "создание легко читаемых макетов с указанием темы, года, ранжирования и категории по цвету",
      },
    ],
  },
  {
    id: "project4",
    title: "Презентации",
    description:
      "",
    audience: "",
    slides: [
      {
        image: presentation31,
        task: "разработка учебной презентации по Сталинградской битве",
        solution:
          "подбор иллюстраций, расстановка смысловых акцентов, структурирование информации",
      },
      {
        image: presentation32,
        task: "разработка учебной презентации по Сталинградской битве",
        solution:
          "подбор иллюстраций, расстановка смысловых акцентов, структурирование информации",
      },
      {
        image: presentation21,
        task: "создание презентации для выступления по экологическим проблемам г. Красноярска",
        solution:
          "подбор иллюстраций, расстановка смысловых акцентов, структурирование информации, редизайн графиков",
      },
      {
        image: presentation22,
        task: "создание презентации для выступления по экологическим проблемам г. Красноярска",
        solution:
          "подбор иллюстраций, расстановка смысловых акцентов, структурирование информации, редизайн графиков",
      },
      {
        image: presentation23,
        task: "создание презентации для выступления по экологическим проблемам г. Красноярска",
        solution:
          "подбор иллюстраций, расстановка смысловых акцентов, структурирование информации, редизайн графиков",
      },
      {
        image: presentation24,
        task: "создание презентации для выступления по экологическим проблемам г. Красноярска",
        solution:
          "подбор иллюстраций, расстановка смысловых акцентов, структурирование информации, редизайн графиков",
      },
      {
        image: presentation25,
        task: "создание презентации для выступления по экологическим проблемам г. Красноярска",
        solution:
          "подбор иллюстраций, расстановка смысловых акцентов, структурирование информации, редизайн графиков",
      },
      {
        image: presentation11,
        task: "создание презентации услуги по грузоперевозкам и переезду",
        solution:
          "расстановка смысловых акцентов, интерактивность (в мобильной версии при нажатии на телефон на 3 слайде автоматически набирается номер), создание ощущения надежности, броская типографика и цвета для привлечения внимания молодой целевой аудитории",
      },
      {
        image: presentation12,
        task: "создание презентации услуги по грузоперевозкам и переезду",
        solution:
          "расстановка смысловых акцентов, интерактивность (в мобильной версии при нажатии на телефон на 3 слайде автоматически набирается номер), создание ощущения надежности, броская типографика и цвета для привлечения внимания молодой целевой аудитории",
      },
      {
        image: presentation13,
        task: "создание презентации услуги по грузоперевозкам и переезду",
        solution:
          "расстановка смысловых акцентов, интерактивность (в мобильной версии при нажатии на телефон на 3 слайде автоматически набирается номер), создание ощущения надежности, броская типографика и цвета для привлечения внимания молодой целевой аудитории",
      },
    ],
  },
];
```

### Файл: /Users/z/polinavite/src/constants/styles.js (1.20 КБ)
```js
// src/constants/styles.js
export const CARD_STYLES = {
  CONTAINER: 'bg-white/5 hover:shadow-lg rounded-[1.875rem] md:rounded-[1.25rem] transition-all hover:-translate-y-2 duration-300 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 group',
  IMAGE: 'group-hover:scale-105 w-full transition-transform duration-300 object-cover'
};

export const SECTION_STYLES = {
  CONTAINER: 'relative mx-auto px-4 py-[7.75rem] max-w-[75rem]',
  HEADER_WRAPPER: 'relative mb-[4.1875rem] text-center z-0',
  DECORATION: 'absolute top-[-2.875rem] md:top-[-1.875rem] left-[50%] w-[25.875rem] md:w-[17.25rem] h-[28.0125rem] md:h-[18.675rem] transform -translate-x-[20.6rem] md:-translate-x-[13.625rem] z-0',
  DECORATION_IMAGE: 'w-full h-full object-contain',
  TITLE: 'font-mv-skifer text-[4.6875rem] md:text-[3.125rem] leading-[1.24] tracking-[0.01em] relative z-10',
  GRID: 'relative z-10 gap-[2.71875rem] md:gap-[1.8125rem] grid grid-cols-1 md:grid-cols-2 mx-auto max-w-[70.65625rem] md:max-w-full'
};

export const IMAGE_STYLES = {
  CONTAINER: 'relative w-full',
  SKELETON: 'block inset-0 rounded-[1.25rem] bg-white w-full h-[400px]',
  ERROR: 'text-red-500 text-center',
  IMAGE: 'w-full object-contain'
};
```

## Директория: /Users/z/polinavite/src/hooks


### Файл: /Users/z/polinavite/src/hooks/index.js (137 байт)
```js
// src/hooks/index.js
export { useDeviceDetection } from './useDeviceDetection';
export { useLockBodyScroll } from './useLockBodyScroll';
```

### Файл: /Users/z/polinavite/src/hooks/useDeviceDetection.js (709 байт)
```js
// src/hooks/useDeviceDetection.js
/**
 * Хук для определения типа устройства пользователя
 * @returns {boolean} true для сенсорных устройств
 * @example
 * const Component = () => {
 *   const isTouchDevice = useDeviceDetection();
 *   return isTouchDevice ? <TouchUI /> : <DesktopUI />;
 * };
 */

import { useState, useEffect } from 'react';

export const useDeviceDetection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }, []);

  return isTouchDevice;
};
```

### Файл: /Users/z/polinavite/src/hooks/useImageLoad.js (576 байт)
```js
// src/hooks/useImageLoad.js
import { useEffect } from 'react';
import { imageService } from '@/services';
import { observable } from '@legendapp/state';

// Создаем observable для статуса
const loadStatus = observable('init');

export const useImageLoad = (src) => {
  useEffect(() => {
    if (!src) return;

    const subscription = imageService.status$
      .subscribe(newStatus => loadStatus.set(newStatus));

    imageService.loadImage(src).catch(console.error);

    return () => subscription.unsubscribe();
  }, [src]);

  return loadStatus.get();
};
```

### Файл: /Users/z/polinavite/src/hooks/useLockBodyScroll.js (1.02 КБ)
```js
// src/hooks/useLockBodyScroll.js
/**
 * Хук для блокировки прокрутки body при открытии модального окна
 * @param {boolean} isLocked - Флаг блокировки прокрутки
 * @example
 * const Modal = () => {
 *   useLockBodyScroll(true);
 *   return <div>Modal content</div>;
 * };
 */

import { useEffect } from 'react';

export const useLockBodyScroll = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;
    const originalStyle = {
      position: document.body.style.position,
      width: document.body.style.width,
      overflowY: document.body.style.overflowY,
      top: document.body.style.top
    };

    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.overflowY = 'hidden';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      Object.assign(document.body.style, originalStyle);
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};
```

### Файл: /Users/z/polinavite/src/hooks/usePreloadImages.js (1.86 КБ)
```js
// src/hooks/usePreloadImages.js
/**
 * Хук для предварительной загрузки набора изображений
 * @param {string[]} images - Массив URL изображений для загрузки
 * @param {number} [concurrency=3] - Количество параллельных загрузок
 * @returns {Object} Объект с информацией о статусе загрузки
 * @property {number} progress - Прогресс загрузки (0-100)
 * @property {boolean} isComplete - Флаг завершения загрузки
 * @property {Error|null} error - Ошибка загрузки, если есть
 * @example
 * const Component = () => {
 *   const { progress, isComplete } = usePreloadImages(['img1.jpg', 'img2.jpg']);
 *   return isComplete ? <Content /> : <Loading progress={progress} />;
 * };
 */

import { observable } from '@legendapp/state';
import { imageService } from '@services';

const preloadState = observable({
  progress: 0,
  isComplete: false,
  error: null
});

export const usePreloadImages = (images, concurrency = 3) => {
  React.useEffect(() => {
    if (!images?.length) return;

    const totalImages = images.length;
    let loadedImages = 0;

    preloadState.set({
      progress: 0,
      isComplete: false,
      error: null
    });

    imageService.preloadImages(images, concurrency)
      .then(() => {
        preloadState.set({
          progress: 100,
          isComplete: true,
          error: null
        });
      })
      .catch(error => {
        preloadState.error.set(error);
      });

    return () => {
      preloadState.set({
        progress: 0,
        isComplete: false,
        error: null
      });
    };
  }, [images, concurrency]);

  return {
    progress: preloadState.progress.get(),
    isComplete: preloadState.isComplete.get(),
    error: preloadState.error.get()
  };
};
```

### Файл: /Users/z/polinavite/src/main.jsx (2.51 КБ)
```jsx
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
```

## Директория: /Users/z/polinavite/src/services


### Файл: /Users/z/polinavite/src/services/image.service.js (4.82 КБ)
```js
// src/services/image.service.js
/**
 * Сервис для управления загрузкой и кешированием изображений
 * @class
 */

import { observable } from "@legendapp/state";
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class ImageService {

  /**
   * Создает экземпляр сервиса
   * @constructor
   */
  constructor() {
    this.status$ = observable('init');
    this.retryCount$ = observable(0);
    this.imageCache = new Map();
    this.preloadQueue = new Set();
    this.loadingPromises = new Map();
  }

  /**
     * Загружает изображение с возможностью приоритизации
     * @param {string} src - URL изображения
     * @param {boolean} [priority=false] - Флаг приоритетной загрузки
     * @returns {Promise<HTMLImageElement>} Промис с загруженным изображением
     * @throws {Error} Ошибка при неудачной загрузке
     */
  loadImage(src, priority = false) {
    // Если изображение уже в кеше, возвращаем его
    if (this.imageCache.has(src)) {
      this.status$.set('loaded');
      return Promise.resolve(this.imageCache.get(src));
    }

    // Если изображение уже загружается, возвращаем существующий промис
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src);
    }

    // Создаем новый промис для загрузки
    const loadPromise = new Promise((resolve, reject) => {
      this.status$.set('loading');

      const img = new Image();

      img.onload = () => {
        this.imageCache.set(src, img);
        this.status$.set('loaded');
        this.retryCount$.set(0);
        this.loadingPromises.delete(src);
        resolve(img);
      };

      img.onerror = () => {
        if (this.retryCount$.get() < 3) {
          setTimeout(() => {
            this.retryCount$.set(prev => prev + 1);
            this.status$.set('retrying');
            img.src = src;
          }, 1000 * this.retryCount$.get());
        } else {
          this.status$.set('error');
          this.loadingPromises.delete(src);
          reject(new Error('Failed to load image'));
        }
      };

      if (priority) {
        img.fetchPriority = 'high';
      }

      img.src = src;
    });

    this.loadingPromises.set(src, loadPromise);
    return loadPromise;
  }

  /**
     * Предзагружает набор изображений с поддержкой параллельной загрузки
     * @param {string[]} sources - Массив URL изображений
     * @param {Object} [options] - Опции загрузки
     * @param {number} [options.concurrency=3] - Количество параллельных загрузок
     * @param {boolean} [options.priority=false] - Приоритет загрузки
     * @returns {Promise<HTMLImageElement[]>} Промис с массивом загруженных изображений
     */
  preloadImages(sources, { concurrency = 3, priority = false } = {}) {
    if (!sources?.length) return Promise.resolve([]);

    // Фильтруем уже загруженные или загружающиеся изображения
    const newSources = sources.filter(src =>
      !this.imageCache.has(src) &&
      !this.preloadQueue.has(src)
    );

    // Добавляем новые источники в очередь
    newSources.forEach(src => this.preloadQueue.add(src));

    return from(newSources).pipe(
      mergeMap(src => from(this.loadImage(src, priority)), concurrency)
    ).toPromise()
      .finally(() => {
        // Очищаем очередь после загрузки
        newSources.forEach(src => this.preloadQueue.delete(src));
      });
  }

  /**
     * Очищает кеш изображений
     * @param {boolean} [preserveCritical=true] - Сохранять ли критические изображения
     */
  clearCache(preserveCritical = true) {
    if (!preserveCritical) {
      this.imageCache.clear();
    } else {
      // Находим критические изображения (первые в каждом проекте)
      const criticalImages = Array.from(this.imageCache.keys())
        .filter(key => key.includes('slide0') || key.includes('cover'));

      this.imageCache.clear();

      // Восстанавливаем критические изображения
      criticalImages.forEach(key => {
        if (this.imageCache.has(key)) {
          const img = this.imageCache.get(key);
          this.imageCache.set(key, img);
        }
      });
    }

    this.status$.set('init');
    this.retryCount$.set(0);
  }
}

export const imageService = new ImageService();
```

### Файл: /Users/z/polinavite/src/services/index.js (95 байт)
```js
// src/services/index.js
export * from './image.service';
export * from './navigation.service';
```

### Файл: /Users/z/polinavite/src/services/navigation.service.js (1.82 КБ)
```js
// src/services/navigation.service.js
/**
 * Сервис для управления навигацией по слайдам
 * @namespace
 */
import { observable } from '@legendapp/state';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

// Включаем отслеживание для React
enableReactTracking({
  auto: true,
});

const state = observable({
  currentSlideIndex: 0,
  totalSlides: 0
});

// Действия
const navigationActions = {

  /**
   * Устанавливает общее количество слайдов
   * @param {number} total - Количество слайдов
   */
  setTotalSlides: (total) => {
    state.totalSlides.set(total);
  },

  /**
   * Переключает на следующий слайд
   * @throws {Error} Если достигнут последний слайд
   */
  nextSlide: () => {
    const currentIndex = state.currentSlideIndex.get();
    const totalSlides = state.totalSlides.get();
    if (currentIndex < totalSlides - 1) {
      state.currentSlideIndex.set(currentIndex + 1);
    }
  },

  /**
   * Переключает на предыдущий слайд
   * @throws {Error} Если достигнут первый слайд
   */
  prevSlide: () => {
    const currentIndex = state.currentSlideIndex.get();
    if (currentIndex > 0) {
      state.currentSlideIndex.set(currentIndex - 1);
    }
  },

  /**
   * Сбрасывает навигацию в начальное состояние
   */
  reset: () => {
    state.currentSlideIndex.set(0);
    state.totalSlides.set(0);
  }
};

// Селекторы
const navigationSelectors = {
  useCurrentSlide: () => state.currentSlideIndex.get(),
  useTotalSlides: () => state.totalSlides.get(),
};

export const navigationService = {
  ...navigationActions,
  ...navigationSelectors
};
```

## Директория: /Users/z/polinavite/src/stores


### Файл: /Users/z/polinavite/src/stores/index.js (52 байт)
```js
// src/stores/index.js
export * from './modalStore';
```

### Файл: /Users/z/polinavite/src/stores/modalStore.js (1.50 КБ)
```js
// src/stores/modalStore.js
import { observable, computed } from '@legendapp/state';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

// Включаем отслеживание для React
enableReactTracking({
  auto: true,
});

// Создаем базовый стейт
const state = observable({
  modalId: null,
  currentProject: null,
  currentSlideIndex: 0
});

// Действия с модальными окнами
const modalActions = {
  openModal: (id, project) => {
    state.modalId.set(id);
    state.currentProject.set(project);
    state.currentSlideIndex.set(0);
  },

  closeModal: () => {
    state.modalId.set(null);
    state.currentProject.set(null);
    state.currentSlideIndex.set(0);
  },

  setSlide: (index) => {
    state.currentSlideIndex.set(index);
  },

  nextSlide: () => {
    const currentIndex = state.currentSlideIndex.get();
    const totalSlides = state.currentProject.get()?.slides?.length || 0;
    if (currentIndex < totalSlides - 1) {
      state.currentSlideIndex.set(currentIndex + 1);
    }
  },

  prevSlide: () => {
    const currentIndex = state.currentSlideIndex.get();
    if (currentIndex > 0) {
      state.currentSlideIndex.set(currentIndex - 1);
    }
  }
};

// Селекторы
const modalSelectors = {
  useIsOpen: () => state.modalId.get() !== null,
  useCurrentProject: () => state.currentProject.get(),
  useCurrentSlide: () => state.currentSlideIndex.get(),
};

export const modalStore = {
  ...modalActions,
  ...modalSelectors
};
```

### Файл: /Users/z/polinavite/src/stores/navigationStore.js (1.32 КБ)
```js
// src/stores/navigationStore.js
import { observable } from '@legendapp/state';
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

enableReactTracking({
  auto: true,
});

const state = observable({
  currentSlideIndex: 0,
  totalSlides: 0,
  direction: 'none' // 'left' или 'right'
});

const navigationActions = {
  setTotalSlides: (total) => {
    state.totalSlides.set(total);
  },

  nextSlide: () => {
    state.direction.set('right');
    const currentIndex = state.currentSlideIndex.get();
    const totalSlides = state.totalSlides.get();
    state.currentSlideIndex.set(
      currentIndex === totalSlides - 1 ? 0 : currentIndex + 1
    );
  },

  prevSlide: () => {
    state.direction.set('left');
    const currentIndex = state.currentSlideIndex.get();
    const totalSlides = state.totalSlides.get();
    state.currentSlideIndex.set(
      currentIndex === 0 ? totalSlides - 1 : currentIndex - 1
    );
  },

  reset: () => {
    state.currentSlideIndex.set(0);
    state.totalSlides.set(0);
    state.direction.set('none');
  }
};

const navigationSelectors = {
  useCurrentSlide: () => state.currentSlideIndex.get(),
  useTotalSlides: () => state.totalSlides.get(),
  useDirection: () => state.direction.get(),
};

export const navigationStore = {
  ...navigationActions,
  ...navigationSelectors
};
```

### Файл: /Users/z/polinavite/tailwind.config.js (886 байт)
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        'mv-skifer': ['MV-SKIFER', 'sans-serif'],
        'onest': ['Onest', 'sans-serif'],
      },
      colors: {
        primary: '#04061B',
        secondary: '#3624A6',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        pulse: {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)'
          },
          '50%': {
            opacity: 0.5,
            transform: 'scale(0.95)'
          }
        },
      }
    },
  },
  plugins: [],
};
```

### Файл: /Users/z/polinavite/vite.config.js (1.22 КБ)
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@features': path.resolve(__dirname, './src/components/features'),
      '@services': path.resolve(__dirname, './src/services'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@fonts': path.resolve(__dirname, './src/assets/fonts')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
          'state-vendor': ['@legendapp/state', 'rxjs']
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    open: true
  }
});
```
