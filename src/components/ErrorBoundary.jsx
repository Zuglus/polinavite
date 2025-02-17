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