# Хуки (Hooks)

## Определение и принципы
Хуки в данной архитектуре служат мостом между сервисами и компонентами React. Они предоставляют реактивный интерфейс для доступа к данным и методам сервисов.

## Стандарты для хуков
1. Хуки должны иметь префикс `use` и следовать правилам хуков React
2. Хуки предоставляют интерфейс между сервисами и компонентами React
3. Хуки инкапсулируют логику взаимодействия с сервисами
4. Хуки должны управлять подписками (subscribe/unsubscribe)
5. Хуки не должны содержать бизнес-логику - только вызовы сервисов
6. Хуки должны быть типизированы (с учетом будущего перехода на TypeScript)
7. Хуки должны правильно обрабатывать эффекты очистки (cleanup)

## Структура хука
```javascript
// src/hooks/useExample.js
import { useState, useEffect } from 'react';
import { exampleService } from '@/services';

export const useExample = (params) => {
  const [data, setData] = useState(exampleService.state$.data.get());
  const [loading, setLoading] = useState(exampleService.state$.loading.get());
  const [error, setError] = useState(exampleService.state$.error.get());

  useEffect(() => {
    // Подписка на изменения состояния
    const dataSubscription = exampleService.state$.data.subscribe(newData => {
      setData(newData);
    });

    const loadingSubscription = exampleService.state$.loading.subscribe(newLoading => {
      setLoading(newLoading);
    });

    const errorSubscription = exampleService.state$.error.subscribe(newError => {
      setError(newError);
    });

    // Опционально: инициализация данных
    if (params && !data) {
      exampleService.fetchData(params).catch(console.error);
    }

    // Очистка подписок при размонтировании
    return () => {
      dataSubscription.unsubscribe();
      loadingSubscription.unsubscribe();
      errorSubscription.unsubscribe();
    };
  }, [params]); // Зависимости эффекта

  // Методы для взаимодействия с сервисом
  const refetch = async () => {
    try {
      return await exampleService.fetchData(params);
    } catch (error) {
      console.error('Error refetching data:', error);
      throw error;
    }
  };

  return {
    data,
    loading,
    error,
    refetch
  };
};
```

## Использование в компонентах
```javascript
const MyComponent = ({ id }) => {
  const { data, loading, error, refetch } = useExample(id);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <div>{data}</div>
    </div>
  );
};
```