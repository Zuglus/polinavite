# Требования к проекту (v4.0)

## 1. Архитектура проекта

```
src/
├── components/       # Переиспользуемые компоненты
│   ├── ui/          # Базовые UI компоненты (кнопки, инпуты)
│   └── features/    # Компоненты с бизнес-логикой
├── hooks/           # Кастомные хуки
├── stores/          # Observable stores (@legendapp/state)
├── services/        # Сервисы (imageService, navigationService)
├── constants/       # Константы и базовые темы
├── assets/          # Статические файлы
│   ├── images/      # Изображения
│   └── fonts/       # Шрифты
└── App.jsx          # Главный компонент
```

## 2. Основные правила

### 2.1 Управление состоянием
- Использовать только @legendapp/state для управления состоянием
- Запрещены: useState, useReducer
- Структура сторов:
  ```javascript
  // stores/modal.store.js
  import { observable } from '@legendapp/state'
  
  export const modalStore = observable({
    modalId: null,
    currentProject: null,
    openModal: (id, project) => {
      modalStore.modalId.set(id);
      modalStore.currentProject.set(project);
    },
    closeModal: () => {
      modalStore.modalId.set(null);
      modalStore.currentProject.set(null);
    }
  });
  ```

### 2.2 Стилизация
- Основной инструмент: Tailwind CSS
- Стили компонентов должны быть самодостаточными

### 2.3 RxJS и Observable
- Использовать только для:
  1. Предзагрузки изображений
  2. Сложных анимаций
  3. Событий с debounce/throttle
- Пример:
  ```javascript
  // services/image.service.js
  import { BehaviorSubject } from 'rxjs';
  
  export class ImageService {
    status$ = new BehaviorSubject('init');
    
    loadImage(src) {
      this.status$.next('loading');
      // ... логика загрузки
    }
  }
  ```

## 3. Оптимизации
- React.memo() для компонентов
- Ленивая загрузка через React.lazy()
- Предзагрузка критических данных
- Оптимизация изображений

## 4. Правила именования
- Компоненты: PascalCase (HeaderComponent)
- Хуки: camelCase с префиксом use (useImageLoad)
- Сторы: camelCase с суффиксом Store (modalStore)
- Сервисы: camelCase с суффиксом Service (imageService)
- Константы: UPPER_SNAKE_CASE (THEME_COLORS)

## 5. Документация
- JSDoc для компонентов и функций
- README.md с описанием проекта
- Комментарии для сложной логики