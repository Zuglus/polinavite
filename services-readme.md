# Сервисы

## Определение и принципы
Сервисы в данной архитектуре отвечают за бизнес-логику и взаимодействие с внешними ресурсами. Они представляют собой синглтоны, которые экспортируются из соответствующих модулей и используются компонентами через хуки.

## Стандарты для сервисов
1. Сервисы отвечают за бизнес-логику и взаимодействие с внешними ресурсами
2. Сервисы предоставляют Observable состояния для реактивного обновления
3. Сервисы содержат методы для изменения состояния и выполнения операций
4. Сервисы не должны импортировать React-хуки или компоненты
5. Сервисы должны быть реализованы как классы с чётким API
6. Для экспорта используется паттерн синглтона (экземпляр класса)
7. Сервисы должны обрабатывать ошибки и передавать их в errorService
8. Сервисы должны быть покрыты юнит-тестами

## Структура сервиса
```javascript
// src/services/example.service.js
import { observable } from '@legendapp/state';
import { errorService } from './error.service';

export class ExampleService {
  constructor() {
    this.state$ = observable({
      data: null,
      loading: false,
      error: null
    });
  }

  async fetchData() {
    try {
      this.state$.loading.set(true);
      // Выполнение операции
      this.state$.data.set(result);
      return result;
    } catch (error) {
      this.state$.error.set(error);
      errorService.handleError(error, { 
        source: 'ExampleService',
        operation: 'fetchData'
      });
      throw error;
    } finally {
      this.state$.loading.set(false);
    }
  }
}

export const exampleService = new ExampleService();
```

## Взаимодействие с хуками
Сервисы не должны импортировать хуки React, вместо этого хуки должны импортировать сервисы и предоставлять реактивный интерфейс для компонентов.