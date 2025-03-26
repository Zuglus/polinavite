// src/utils/LRUCache.js
// Версия без типов для тестирования
export class LRUCache {
  constructor(maxSize = 100, onEvict = null) {
    if (maxSize <= 0) {
      throw new Error('Cache size must be greater than 0');
    }
    this.maxSize = maxSize;
    this.cache = new Map();
    this.onEvict = onEvict;
    
    // Для статистики
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0
    };
  }

  get(key) {
    if (!this.cache.has(key)) {
      this.stats.misses++;
      return undefined;
    }
    
    // Обновляем позицию элемента (делаем его самым недавно использованным)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    
    this.stats.hits++;
    return value;
  }

  set(key, value) {
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
      if (typeof this.onEvict === 'function') {
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

  has(key) {
    return this.cache.has(key);
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
    this.resetStats();
  }

  get size() {
    return this.cache.size;
  }

  get capacity() {
    return this.maxSize;
  }

  resize(newSize) {
    if (newSize <= 0) {
      throw new Error('Cache size must be greater than 0');
    }
    
    // Если новый размер меньше текущего, удаляем старые элементы
    while (this.cache.size > newSize) {
      const oldestKey = this.cache.keys().next().value;
      const oldestValue = this.cache.get(oldestKey);
      this.cache.delete(oldestKey);
      
      this.stats.evictions++;
      
      if (typeof this.onEvict === 'function') {
        try {
          this.onEvict(oldestKey, oldestValue);
        } catch (e) {
          console.error('Error in onEvict callback:', e);
        }
      }
    }
    
    this.maxSize = newSize;
  }

  keys() {
    return Array.from(this.cache.keys());
  }

  values() {
    return Array.from(this.cache.values());
  }

  getStats() {
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

  resetStats() {
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0
    };
  }
}