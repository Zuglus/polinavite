// src/utils/LRUCache.ts
/**
 * Реализация кеша по алгоритму LRU (Least Recently Used)
 * @class
 */
export class LRUCache<K, V> {
    private maxSize: number;
    private cache: Map<K, V>;
    private onEvict?: (key: K, value: V) => void;
    private stats: {
      hits: number;
      misses: number;
      evictions: number;
    };
  
    /**
     * Создает экземпляр LRU-кеша
     * @param {number} maxSize - Максимальный размер кеша
     * @param {Function} onEvict - Опциональный колбэк при вытеснении элемента из кеша
     */
    constructor(maxSize: number = 100, onEvict?: (key: K, value: V) => void) {
      if (maxSize <= 0) {
        throw new Error('Cache size must be greater than 0');
      }
      this.maxSize = maxSize;
      this.cache = new Map<K, V>();
      this.onEvict = onEvict;
      
      // Для статистики
      this.stats = {
        hits: 0,
        misses: 0,
        evictions: 0
      };
    }
  
    /**
     * Получает элемент из кеша
     * @param {K} key - Ключ
     * @returns {V | undefined} Значение, связанное с ключом, или undefined
     */
    get(key: K): V | undefined {
      if (!this.cache.has(key)) {
        this.stats.misses++;
        return undefined;
      }
      
      // Обновляем позицию элемента (делаем его самым недавно использованным)
      const value = this.cache.get(key)!;
      this.cache.delete(key);
      this.cache.set(key, value);
      
      this.stats.hits++;
      return value;
    }
  
    /**
     * Добавляет или обновляет элемент в кеше
     * @param {K} key - Ключ
     * @param {V} value - Значение
     */
    set(key: K, value: V): void {
      // Если ключ уже существует, удаляем его
      if (this.cache.has(key)) {
        this.cache.delete(key);
      } else if (this.cache.size >= this.maxSize) {
        // Если размер кеша превышен, удаляем наименее недавно использованный элемент
        const oldestKey = this.cache.keys().next().value;
        const oldestValue = this.cache.get(oldestKey);
        this.cache.delete(oldestKey);
        
        this.stats.evictions++;
        
        // Вызываем колбэк при вытеснении
        if (typeof this.onEvict === 'function' && oldestValue !== undefined) {
          try {
            this.onEvict(oldestKey, oldestValue);
          } catch (e) {
            console.error('Error in onEvict callback:', e);
          }
        }
      }
      
      // Добавляем новый ключ (будет в конце Map, как самый свежий)
      this.cache.set(key, value);
    }
  
    /**
     * Проверяет наличие ключа в кеше
     * @param {K} key - Ключ
     * @returns {boolean} true, если ключ присутствует в кеше
     */
    has(key: K): boolean {
      return this.cache.has(key);
    }
  
    /**
     * Удаляет элемент из кеша
     * @param {K} key - Ключ
     * @returns {boolean} true, если элемент был удален
     */
    delete(key: K): boolean {
      return this.cache.delete(key);
    }
  
    /**
     * Очищает кеш
     */
    clear(): void {
      this.cache.clear();
      this.resetStats();
    }
  
    /**
     * Возвращает текущий размер кеша
     * @returns {number} Количество элементов в кеше
     */
    get size(): number {
      return this.cache.size;
    }
  
    /**
     * Возвращает максимальный размер кеша
     * @returns {number} Максимальное количество элементов в кеше
     */
    get capacity(): number {
      return this.maxSize;
    }
  
    /**
     * Изменяет максимальный размер кеша
     * @param {number} newSize - Новый максимальный размер
     */
    resize(newSize: number): void {
      if (newSize <= 0) {
        throw new Error('Cache size must be greater than 0');
      }
      
      // Если новый размер меньше текущего, удаляем старые элементы
      while (this.cache.size > newSize) {
        const oldestKey = this.cache.keys().next().value;
        const oldestValue = this.cache.get(oldestKey);
        this.cache.delete(oldestKey);
        
        this.stats.evictions++;
        
        if (typeof this.onEvict === 'function' && oldestValue !== undefined) {
          try {
            this.onEvict(oldestKey, oldestValue);
          } catch (e) {
            console.error('Error in onEvict callback:', e);
          }
        }
      }
      
      this.maxSize = newSize;
    }
  
    /**
     * Получает все ключи кеша в порядке от наименее к наиболее недавно использованным
     * @returns {K[]} Массив ключей
     */
    keys(): K[] {
      return Array.from(this.cache.keys());
    }
  
    /**
     * Получает все значения кеша в порядке от наименее к наиболее недавно использованным
     * @returns {V[]} Массив значений
     */
    values(): V[] {
      return Array.from(this.cache.values());
    }
  
    /**
     * Получает статистику использования кеша
     * @returns {Object} Объект со статистикой
     */
    getStats(): {
      hits: number;
      misses: number;
      evictions: number;
      hitRate: number;
      fillRate: number;
      size: number;
      capacity: number;
    } {
      const hitRate = this.stats.hits + this.stats.misses === 0 
        ? 0 
        : this.stats.hits / (this.stats.hits + this.stats.misses);
      
      return {
        ...this.stats,
        hitRate: hitRate,
        fillRate: this.cache.size / this.maxSize,
        size: this.cache.size,
        capacity: this.maxSize
      };
    }
  
    /**
     * Сбрасывает статистику использования кеша
     */
    resetStats(): void {
      this.stats = {
        hits: 0,
        misses: 0,
        evictions: 0
      };
    }
  }