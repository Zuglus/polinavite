# Общие инструкции для проекта (v1.0):

структура:
src/
  components/      # Переиспользуемые компоненты
  hooks/           # Кастомные хуки
  stores/          # Zustand/MobX сторы
  services/        # Логика API (React Query/SWR)
  constants/       # Конфиги, стили

## 1. Философская основа (Диалектический материализм)
### - Единство формы и содержания:

- Компоненты должны отражать суть решаемой задачи.

- Избегать абстрактных названий (\<Card /> → \<ProjectCard />).

### - Развитие через противоречия:

- Рефакторинг проводить итеративно, выявляя конфликты:

- "Состояние vs Потоки данных"

- "Производительность vs Сложность"

### - Практика как критерий истины:

- Каждое изменение должно быть обосновано реальными метриками (производительность, читаемость).

## 2. Технические требования
### Реактивное программирование
``` jsx
// Правильно
const state = useObservable({ 
  modal: { 
    isOpen: false 
  } 
});

// Неправильно
const [isOpen, setIsOpen] = useState(false);
```

### Структура файлов
```
src/
├── components/      # Все компоненты
├── services/        # RxJS-сервисы
├── stores/          # Глобальные состояния
├── constants/       # Стили, конфиги
└── hooks/           # Кастомные хуки
```

### Стилизация
``` javascript
// constants/styles.js
export const MODAL_STYLES = {
  OVERLAY: "fixed inset-0 bg-black/50",
  CONTENT: "bg-white rounded-lg p-6"
};

// Компонент
<div className={MODAL_STYLES.OVERLAY}>
```

### Обработчики событий
``` jsx
// Именование через handle*
const handleCardClick = () => { ... };

<button onClick={handleCardClick}>
```

## 3. Единый кодстайл
### Сервисы (RxJS)
``` javascript
// services/api.service.js
class ApiService {
  constructor() {
    this.data$ = new BehaviorSubject(null);
  }

  fetchData() {
    return fetch(url).pipe(
      tap(data => this.data$.next(data)),
      catchError(this.handleError)
    );
  }
}
```

### Компоненты
``` jsx
function Component() {
  const state = useObservable({ ... });

  useEffect(() => {
    const sub = service.data$.subscribe();
    return () => sub.unsubscribe();
  }, []);

  return <div>{state.value.get()}</div>;
}
```

## 4. Процесс внедрения
### 1. Базовый рефакторинг:

- Замена useState → useObservable

- Вынос стилей в constants/

- Переименование обработчиков

### 2. Интеграция RxJS:

- Создание сервисов для:

    - Загрузки данных

    - Управления состоянием

    - Обработки событий

### 3. Оптимизация:

- Мемоизация через React.memo

- Ленивая загрузка компонентов

## 5. Пример рефакторинга (шаг за шагом)

**Было:**

``` jsx
const [count, setCount] = useState(0);
```

**Стало:**

``` jsx
import { useObservable } from '@legendapp/state/react';

const state = useObservable({ count: 0 });

// Обновление
state.count.set(5);
```

## 6. Коммиты
Формат сообщений:

```
<тип>(<область>): <описание>

Примеры:
feat(modal): add rxjs-based animation system
fix(image): retry loading logic
refactor(header): migrate to useObservable
```

## 7. Контроль качества

1. ESLint-правила:

``` javascript
// eslint.config.js
rules: {
  'react/hook-naming': ['error', { 
    checkEffectDeps: true 
  }],
  'no-vanilla-state': 'error'
}
```

2. Юнит-тесты:

``` javascript
// Каждый сервис должен иметь тесты
test('apiService fetches data', async () => {
  await apiService.fetchData();
  expect(apiService.data$.value).toBeDefined();
});
```