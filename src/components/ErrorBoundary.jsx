// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы при следующем рендере отобразить резервный UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Логируем ошибку.  В реальном приложении здесь можно отправить ошибку в систему мониторинга.
    console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ error, errorInfo }); // Сохранение ошибки для диагностики.
  }

  render() {
    if (this.state.hasError) {
      // Отображаем резервный UI.
      return (
        <div className="flex h-screen w-full items-center justify-center bg-primary text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Что-то пошло не так.</h1>
            <p>Пожалуйста, перезагрузите страницу или попробуйте позже.</p>
            {/* (Опционально) кнопка для перезагрузки.  Просто для примера, в реальности нужна более сложная обработка */}
            <button
             onClick={() => window.location.reload()}
             className='mt-2 px-4 py-1 bg-secondary rounded font-medium'
            >Перезагрузить
            </button>
          </div>
        </div>
      );
    }

    // Если ошибок нет, рендерим дочерние компоненты как обычно.
    return this.props.children;
  }
}

export default ErrorBoundary;