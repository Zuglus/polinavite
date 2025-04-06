# Портфолио Полины Миграновой - Графический дизайнер

[![Site](https://migranova.pro/)](https://migranova.pro/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.11-646CFF.svg)](https://vitejs.dev/)
[![Feature Sliced Design](https://img.shields.io/badge/Feature%20Sliced%20Design-1.0.0-orange.svg)](https://feature-sliced.design/)

## Описание

Статический сайт-портфолио графического дизайнера Полины Миграновой, разработанный с использованием современных веб-технологий и методологий.

## Функциональность

- Адаптивный дизайн для всех типов устройств
- Оптимизированная загрузка изображений с поддержкой WebP и AVIF форматов
- Портфолио с проектами и детальным просмотром через модальные окна
- Анимации и переходы для улучшения пользовательского опыта
- PWA (Progressive Web App) с возможностью установки на устройство
- Высокие показатели производительности и SEO

## Используемые технологии

### Frontend
- **[React](https://reactjs.org/)** - Библиотека для построения пользовательских интерфейсов
- **[TypeScript](https://www.typescriptlang.org/)** - Статическая типизация для JavaScript
- **[Vite](https://vitejs.dev/)** - Современный сборщик для фронтенд-разработки
- **[TailwindCSS](https://tailwindcss.com/)** - Утилитарный CSS-фреймворк
- **[Framer Motion](https://www.framer.com/motion/)** - Библиотека для анимаций
- **[@legendapp/state](https://legendapp.com/open-source/state/)** - Реактивное управление состоянием

### Архитектура и методологии
- **[Feature Sliced Design](https://feature-sliced.design/)** - Методология проектирования фронтенд-приложений
- **[Static Site Generation (SSG)](https://www.netlify.com/blog/2020/04/14/what-is-a-static-site-generator-and-3-ways-to-find-the-best-one/)** - Подход к созданию статических сайтов

### Тестирование
- **[Vitest](https://vitest.dev/)** - Библиотека для модульного тестирования
- **[Testing Library](https://testing-library.com/)** - Набор инструментов для тестирования React-компонентов
- **[Playwright](https://playwright.dev/)** - Инструмент для E2E тестирования

### Оптимизация
- **[Sharp](https://sharp.pixelplumbing.com/)** - Обработка и оптимизация изображений
- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** - Инструмент для аудита веб-сайтов
- **[Vite Plugin PWA](https://vite-plugin-pwa.netlify.app/)** - Плагин для добавления PWA функциональности

## Архитектура проекта

Проект построен по методологии Feature Sliced Design (FSD), которая обеспечивает чёткое разделение бизнес-логики от представления и повышает модульность кода.

```
src/
├── app/          # Инициализация приложения, провайдеры
├── pages/        # Компоненты страниц
├── widgets/      # Композиционные блоки UI
├── features/     # Интерактивные элементы с бизнес-логикой
├── entities/     # Бизнес-сущности
└── shared/       # Переиспользуемый код
```

## Установка и запуск

### Требования
- Node.js v16+
- npm v7+

### Разработка

```bash
# Клонирование репозитория
git clone https://github.com/Zuglus/polinavite.git
cd polinavite

# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
```

### Сборка

```bash
# Обычная сборка
npm run build

# Полная статическая сборка с оптимизацией
npm run build:static

# Просмотр сборки
npm run preview
```

### Тестирование

```bash
# Запуск модульных тестов
npm run test

# Запуск тестов в режиме наблюдения
npm run test:watch

# Проверка типов
npm run check-types

# Линтинг
npm run lint

# Форматирование кода
npm run format
```

## Документация

Документация доступна в Wiki репозитория:

- [Архитектура проекта](https://github.com/Zuglus/polinavite/wiki/Architecture)
- [Инструкции по обновлению контента](https://github.com/Zuglus/polinavite/wiki/Content-Update)
- [Руководство по сборке и деплою](https://github.com/Zuglus/polinavite/wiki/Deployment)
- [Руководство по тестированию](https://github.com/Zuglus/polinavite/wiki/Testing)
- [Feature Sliced Design](https://github.com/Zuglus/polinavite/wiki/Feature-Sliced-Design)

## Вклад в проект

Если вы хотите внести вклад в проект, пожалуйста, следуйте этим шагам:

1. Форкните репозиторий
2. Создайте ветку для вашей фичи или исправления (`git checkout -b feature/amazing-feature`)
3. Закоммитьте ваши изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в репозиторий (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## Лицензия

Этот проект распространяется под лицензией MIT. См. файл [LICENSE](LICENSE) для получения дополнительной информации.