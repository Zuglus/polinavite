# Инструкции по сборке и деплою

## Содержание
1. [Требования к окружению](#требования-к-окружению)
2. [Локальная разработка](#локальная-разработка)
3. [Сборка проекта](#сборка-проекта)
4. [Деплой](#деплой)
5. [Автоматизация процесса](#автоматизация-процесса)
6. [Проверка производительности](#проверка-производительности)

## Требования к окружению

Для работы с проектом необходимы:

- Node.js версии 16 или выше
- npm версии 7 или выше (или yarn/pnpm)
- Git

## Локальная разработка

### Клонирование репозитория

```bash
git clone https://github.com/Zuglus/polinavite.git
cd repository
```

### Установка зависимостей

```bash
npm install
```

### Запуск dev-сервера

```bash
npm run dev
```

После запуска dev-сервера сайт будет доступен по адресу http://localhost:3000

## Сборка проекта

### Стандартная сборка

```bash
npm run build
```

Собранный проект будет расположен в директории `dist`.

### Статическая генерация (рекомендуется)

Для создания полностью оптимизированной статической версии:

```bash
npm run build:static
```

Эта команда:
1. Выполнит стандартную сборку
2. Оптимизирует HTML с добавлением мета-тегов для SEO
3. Создаст sitemap.xml и robots.txt
4. Оптимизирует изображения
5. Сжмет ресурсы для улучшения производительности

### Проверка сборки

Для локальной проверки собранной версии:

```bash
npm run preview
```

## Деплой

Проект настроен для деплоя на различные платформы.

### Деплой на GitHub Pages

1. Настройте GitHub Pages в репозитории:
   - Зайдите в настройки репозитория
   - В разделе Pages выберите ветку `main` и директорию `/docs`

2. Выполните сборку с правильной базовой директорией:

```bash
npm run build:gh-pages
```

3. Запушьте изменения в репозиторий:

```bash
git add docs
git commit -m "Deploy to GitHub Pages"
git push
```

### Деплой на Netlify

1. Настройте проект на Netlify:
   - Создайте новый сайт из репозитория
   - В настройках сборки укажите:
     - Build command: `npm run build:static`
     - Publish directory: `dist`

2. Деплой будет выполнен автоматически при пуше в репозиторий

### Деплой на Vercel

1. Импортируйте проект на Vercel:
   - Подключите репозиторий
   - В настройках укажите:
     - Framework Preset: Vite
     - Build Command: `npm run build:static`
     - Output Directory: `dist`

2. Деплой будет выполнен автоматически при пуше в репозиторий

### Деплой на обычный хостинг

1. Соберите проект:

```bash
npm run build:static
```

2. Загрузите содержимое директории `dist` на ваш хостинг через FTP или SSH:

```bash
# Пример с использованием scp
scp -r dist/* user@your-server:/path/to/www
```

## Автоматизация процесса

### Настройка GitHub Actions

В репозитории уже настроен GitHub Actions для автоматического деплоя. 

Файл конфигурации `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build:static

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
```

## Проверка производительности

После деплоя рекомендуется проверить производительность сайта:

### Lighthouse

1. Откройте сайт в Chrome
2. Откройте DevTools (F12)
3. Перейдите на вкладку "Lighthouse"
4. Запустите аудит для мобильных и десктопных устройств

### PageSpeed Insights

Проверьте производительность через [PageSpeed Insights](https://pagespeed.web.dev/):
1. Введите URL вашего сайта
2. Дождитесь завершения анализа
3. Оптимизируйте на основе рекомендаций

### Web Vitals

Проверьте Core Web Vitals через [Google Search Console](https://search.google.com/search-console):
1. Зарегистрируйте сайт в Search Console
2. Перейдите в раздел "Core Web Vitals"
3. Анализируйте и улучшайте показатели