// src/components/ErrorBoundary.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

// Мок для errorService
vi.mock('@/services/error.service', () => ({
  errorService: {
    handleError: vi.fn()
  }
}));

// Компонент, который вызывает ошибку
const ErrorComponent = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Перехватываем консольные ошибки, чтобы они не засоряли вывод тестов
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="no-error">Content without error</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('no-error')).toBeInTheDocument();
  });

  it('renders error UI when child component throws', () => {
    // Необходимо отключить console.error для этого теста
    const spy = vi.spyOn(console, 'error');
    spy.mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    
    // Проверяем, отображается ли UI ошибки
    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument();
    expect(screen.getByText('Произошла ошибка при загрузке компонента.')).toBeInTheDocument();
    expect(screen.getByText('Попробовать снова')).toBeInTheDocument();
    
    spy.mockRestore();
  });

  it('calls errorService.handleError when an error occurs', () => {
    // Необходимо отключить console.error для этого теста
    const spy = vi.spyOn(console, 'error');
    spy.mockImplementation(() => {});
    
    const errorService = require('@/services/error.service').errorService;
    
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    
    // Проверяем, что errorService.handleError был вызван
    expect(errorService.handleError).toHaveBeenCalled();
    expect(errorService.handleError.mock.calls[0][0].message).toBe('Test error');
    
    spy.mockRestore();
  });
});