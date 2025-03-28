# Руководство по тестированию статического сайта

## Содержание
1. [Введение](#введение)
2. [Подходы к тестированию](#подходы-к-тестированию)
3. [Настройка окружения для тестирования](#настройка-окружения-для-тестирования)
4. [Модульные тесты](#модульные-тесты)
5. [Интеграционные тесты](#интеграционные-тесты)
6. [E2E тесты](#e2e-тесты)
7. [Тестирование производительности](#тестирование-производительности)
8. [Тестирование доступности](#тестирование-доступности)
9. [Автоматизация тестов](#автоматизация-тестов)

## Введение

Тестирование статического сайта имеет свои особенности по сравнению с полноценным веб-приложением. Поскольку сайт генерируется заранее и доставляется пользователю как готовые HTML, CSS и JS файлы, мы не тестируем серверную логику, но должны уделить особое внимание клиентскому опыту и производительности.

## Подходы к тестированию

Для статического сайта рекомендуется использовать следующие подходы:

1. **Модульное тестирование**: тестирование отдельных компонентов и утилит
2. **Интеграционное тестирование**: тестирование взаимодействия компонентов
3. **E2E тестирование**: тестирование пользовательских сценариев
4. **Тестирование производительности**: проверка скорости загрузки и работы сайта
5. **Тестирование доступности**: проверка соответствия стандартам доступности

## Настройка окружения для тестирования

### Необходимые инструменты

- **Vitest** - для модульного и интеграционного тестирования
- **Playwright** - для E2E тестирования
- **Lighthouse** - для тестирования производительности
- **Axe** - для тестирования доступности

### Структура директорий для тестов

```
src/
└── [слои FSD]/
    └── [сегменты]/
        └── [слайсы]/
            ├── __tests__/
            │   ├── unit/
            │   │   └── [component].test.ts
            │   └── integration/
            │       └── [component].integration.test.ts
            └── [файлы компонента]

tests/
├── e2e/
│   ├── fixtures/
│   ├── specs/
│   └── helpers/
├── performance/
└── accessibility/
```

## Модульные тесты

Модульные тесты проверяют отдельные компоненты и утилиты в изоляции.

### Пример модульного теста для компонента

```typescript
// src/entities/project/ui/__tests__/unit/project-card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectCard } from '@entities/project';

describe('ProjectCard', () => {
  const mockProject = {
    id: 'test-project',
    image: '/test-image.jpg',
    alt: 'Test Project'
  };

  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders successfully with provided props', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);
    
    // Проверяем, что изображение отображается правильно
    const image = screen.getByAltText('Test Project');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('calls onClick with project id when clicked', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);
    
    // Находим кнопку и кликаем по ней
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Проверяем, что обработчик был вызван с правильным id
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('test-project');
  });
});
```

### Пример модульного теста для утилиты

```typescript
// src/shared/lib/cache/__tests__/unit/lru-cache.test.ts
import { describe, it, expect, vi } from 'vitest';
import { LRUCache } from '@shared/lib/cache';

describe('LRUCache', () => {
  it('should add and retrieve items', () => {
    const cache = new LRUCache<string, number>(3);
    
    cache.set('a', 1);
    cache.set('b', 2);
    
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);
    expect(cache.size).toBe(2);
  });

  it('should evict least recently used item when capacity is exceeded', () => {
    const cache = new LRUCache<string, number>(2);
    
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);
    
    expect(cache.has('a')).toBe(false);
    expect(cache.has('b')).toBe(true);
    expect(cache.has('c')).toBe(true);
  });
});
```

## Интеграционные тесты

Интеграционные тесты проверяют взаимодействие между компонентами.

### Пример интеграционного теста

```typescript
// src/widgets/portfolio/ui/__tests__/integration/portfolio-section.integration.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PortfolioSection } from '@widgets/portfolio';
import { modalStore } from '@shared/model/stores';

// Мок для modalStore
vi.mock('@shared/model/stores', () => ({
  modalStore: {
    openModal: vi.fn()
  }
}));

// Мок для portfolioData
vi.mock('@shared/config', () => ({
  portfolioData: [
    { id: 'project1', image: '/project1.jpg', alt: 'Project 1' },
    { id: 'project2', image: '/project2.jpg', alt: 'Project 2' }
  ]
}));

describe('PortfolioSection Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all projects from portfolioData', () => {
    render(<PortfolioSection />);
    
    // Проверяем, что все проекты отрисованы
    expect(screen.getByAltText('Project 1')).toBeInTheDocument();
    expect(screen.getByAltText('Project 2')).toBeInTheDocument();
  });

  it('opens modal with correct project when card is clicked', () => {
    render(<PortfolioSection />);
    
    // Находим карточку проекта и кликаем по ней
    const projectCard = screen.getByAltText('Project 1').closest('button');
    fireEvent.click(projectCard!);
    
    // Проверяем, что modalStore.openModal был вызван с правильным id
    expect(modalStore.openModal).toHaveBeenCalledTimes(1);
    expect(modalStore.openModal).toHaveBeenCalledWith('project1', expect.anything());
  });
});
```

## E2E тесты

E2E (End-to-End) тесты проверяют полные пользовательские сценарии.

### Настройка Playwright

```typescript
// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
    {
      name: 'Mobile Chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 667 },
        ...devices['iPhone 8'],
      },
    },
  ],
};

export default config;
```

### Пример E2E теста

```typescript
// tests/e2e/specs/portfolio.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Portfolio Section', () => {
  test('should display all projects and open modal on click', async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    
    // Ждем загрузки карточек проектов
    await page.waitForSelector('[data-testid="portfolio-card"]');
    
    // Проверяем, что все проекты отображаются
    const projectCards = await page.$$('[data-testid="portfolio-card"]');
    expect(projectCards.length).toBeGreaterThan(0);
    
    // Кликаем по первому проекту
    await projectCards[0].click();
    
    // Проверяем, что модальное окно открылось
    await page.waitForSelector('[data-testid="project-modal"]');
    
    // Проверяем возможность навигации по слайдам
    const nextButton = await page.$('[data-testid="next-slide-button"]');
    await nextButton?.click();
    
    // Закрываем модальное окно
    const closeButton = await page.$('[data-testid="close-modal-button"]');
    await closeButton?.click();
    
    // Проверяем, что модальное окно закрылось
    await expect(page.locator('[data-testid="project-modal"]')).toBeHidden();
  });
});
```

## Тестирование производительности

### Настройка Lighthouse CI

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5000'],
      numberOfRuns: 3,
      staticDistDir: './dist',
      settings: {
        preset: 'desktop',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
      },
    },
  },
};
```

### Запуск тестов производительности

```bash
# Установка Lighthouse CI
npm install -g @lhci/cli

# Сборка проекта
npm run build

# Запуск Lighthouse CI
lhci autorun
```

## Тестирование доступности

### Настройка Axe

```typescript
// tests/accessibility/axe-helper.ts
import { AxeBuilder } from '@axe-core/playwright';
import { Page } from '@playwright/test';

export async function checkA11y(page: Page, selector = 'body') {
  const results = await new AxeBuilder({ page })
    .include(selector)
    .analyze();
  
  return results;
}
```

### Пример теста доступности

```typescript
// tests/accessibility/home.test.ts
import { test, expect } from '@playwright/test';
import { checkA11y } from './axe-helper';

test.describe('Accessibility Tests', () => {
  test('Home page should not have any accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const results = await checkA11y(page);
    
    // Проверяем, что нет нарушений доступности
    expect(results.violations).toEqual([]);
  });
  
  test('Modal dialog should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Открываем модальное окно
    await page.click('[data-testid="portfolio-card"]');
    await page.waitForSelector('[data-testid="project-modal"]');
    
    const results = await checkA11y(page, '[data-testid="project-modal"]');
    
    // Проверяем, что нет нарушений доступности
    expect(results.violations).toEqual([]);
  });
});
```

## Автоматизация тестов

### Настройка GitHub Actions

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Check types
        run: npm run check-types
      
      - name: Run unit tests
        run: npm run test
      
      - name: Build project
        run: npm run build
      
      - name: Run E2E tests
        uses: microsoft/playwright-github-action@v1
        
      - name: Install Playwright
        run: npx playwright install --with-deps
        
      - name: Run Playwright tests
        run: npx playwright test
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

### Настройка Husky для pre-commit хуков

```bash
# Установка Husky
npm install --save-dev husky lint-staged

# Настройка pre-commit хуков
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

```json
// package.json (дополнение)
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "vitest related --run"
    ],
    "*.{js,jsx}": [
      "eslint --fix"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

## Заключение

Правильная стратегия тестирования статического сайта помогает обеспечить высокое качество, производительность и доступность. Используя комбинацию модульных, интеграционных и E2E тестов, а также тестов производительности и доступности, вы можете быть уверены, что ваш сайт работает корректно во всех браузерах и устройствах.