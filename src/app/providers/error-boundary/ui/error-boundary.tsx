// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { errorService } from "@shared/api/error/error.service";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Увеличиваем счетчик ошибок
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Интеграция с errorService
    errorService.handleError(error, {
      component: this.constructor.name,
      errorInfo,
      reactTrace: errorInfo?.componentStack,
      isCritical: this.state.errorCount >= 3
    });

    // Отправка ошибки в сервис мониторинга (если будет добавлен)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
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
              <div className="text-sm text-white/60 mb-4">
                {this.state.error && (
                  <div className="overflow-hidden rounded bg-white/5 p-2 mb-2">
                    <code className="break-all whitespace-pre-wrap text-left block text-xs">
                      {this.state.error.toString()}
                    </code>
                  </div>
                )}
              </div>
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
        <div className="flex h-screen w-full items-center justify-center bg-primary text-white" data-testid="error-view">
          <div className="text-center p-8 max-w-lg">
            <h1 className="text-2xl font-bold mb-4">
              Что-то пошло не так
            </h1>
            <p className="mb-4">
              Произошла ошибка при загрузке компонента.
            </p>
            <div className="text-sm text-white/60 mb-4">
              {this.state.error && (
                <div className="overflow-hidden rounded bg-white/5 p-2 mb-2">
                  <code className="break-all whitespace-pre-wrap text-left block text-xs">
                    {this.state.error.toString()}
                  </code>
                </div>
              )}
            </div>
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