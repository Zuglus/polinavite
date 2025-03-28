// src/shared/api/error/error.service.ts
/**
 * Сервис для централизованной обработки ошибок
 * @class
 */
import { ErrorCategory } from "@shared/model/service-types";

export class ErrorService {
  private errorHandlers = [];
  private errorLogs = [];
  private errorCategories = {
    NETWORK: ErrorCategory.NETWORK,
    IMAGE: ErrorCategory.IMAGE,
    UI: ErrorCategory.UI,
    STATE: ErrorCategory.STATE,
    UNKNOWN: ErrorCategory.UNKNOWN
  };

  /**
   * Создает экземпляр сервиса обработки ошибок
   * @constructor
   */
  constructor() {
    this.errorHandlers = [];
    this.errorLogs = [];
  }

  /**
   * Регистрирует обработчик ошибок
   * @param {Function} handler - Функция-обработчик ошибки
   * @returns {Function} Функция для отмены регистрации обработчика
   */
  registerHandler(handler) {
    if (typeof handler !== 'function') {
      throw new Error('Handler must be a function');
    }
    
    this.errorHandlers.push(handler);
    
    // Возвращаем функцию для удаления обработчика
    return () => {
      this.errorHandlers = this.errorHandlers.filter(h => h !== handler);
    };
  }

  /**
   * Определяет категорию ошибки
   * @param {Error} error - Объект ошибки
   * @param {Object} context - Контекст ошибки
   * @returns {string} Категория ошибки
   */
  categorizeError(error, context = {}) {
    // Определение по свойству name объекта Error
    if (error.name === 'NetworkError' || error.message?.includes('network') || 
        error.message?.includes('fetch') || error.message?.includes('http')) {
      return this.errorCategories.NETWORK;
    }
    
    // Определение по контексту
    if (context.component?.includes('Image') || 
        context.operation?.includes('image') || 
        context.source?.includes('image')) {
      return this.errorCategories.IMAGE;
    }
    
    if (context.component && !context.operation) {
      return this.errorCategories.UI;
    }
    
    if (context.store || context.state) {
      return this.errorCategories.STATE;
    }
    
    return this.errorCategories.UNKNOWN;
  }

  /**
   * Обрабатывает ошибку
   * @param {Error} error - Объект ошибки
   * @param {Object} context - Контекст ошибки
   */
  handleError(error, context = {}) {
    const timestamp = new Date();
    const category = this.categorizeError(error, context);
    
    // Создаем запись об ошибке
    const errorRecord = {
      error,
      context,
      timestamp,
      category
    };
    
    // Добавляем в журнал
    this.errorLogs.push(errorRecord);
    
    // Ограничиваем размер журнала
    if (this.errorLogs.length > 100) {
      this.errorLogs.shift();
    }
    
    // Базовое логирование
    console.error(`[${category.toUpperCase()}] Error:`, error, context);
    
    // Вызываем все зарегистрированные обработчики
    this.errorHandlers.forEach(handler => {
      try {
        handler(error, context, category);
      } catch (handlerError) {
        console.error('Error handler failed:', handlerError);
      }
    });
  }

  /**
   * Очищает журнал ошибок
   */
  clearErrorLogs() {
    this.errorLogs = [];
  }

  /**
   * Возвращает журнал ошибок
   * @returns {Array} Массив записей об ошибках
   */
  getErrorLogs() {
    return [...this.errorLogs];
  }

  /**
   * Возвращает ошибки определенной категории
   * @param {string} category - Категория ошибки
   * @returns {Array} Массив записей об ошибках выбранной категории
   */
  getErrorsByCategory(category) {
    return this.errorLogs.filter(log => log.category === category);
  }
}

// Создаем и экспортируем единственный экземпляр сервиса
export const errorService = new ErrorService();