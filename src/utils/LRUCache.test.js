// src/utils/LRUCache.test.js
import { LRUCache } from './LRUCache';

/**
 * Простая функция для ручного тестирования LRUCache
 * @returns {void}
 */
export function testLRUCache() {
  console.log('Testing LRUCache...');
  
  // Создаем кеш размером 3 элемента
  const cache = new LRUCache(3);
  
  // Добавляем элементы
  cache.set('a', 1);
  cache.set('b', 2);
  cache.set('c', 3);
  
  console.log('Cache after adding 3 items:', cache.keys());
  console.log('Cache size:', cache.size);
  
  // Получаем элемент (делаем его самым недавно использованным)
  console.log('Get a:', cache.get('a'));
  console.log('Cache after getting a:', cache.keys());
  
  // Добавляем еще один элемент (должен вытеснить b, т.к. a был недавно использован)
  cache.set('d', 4);
  
  console.log('Cache after adding d:', cache.keys());
  console.log('b should be evicted, has b:', cache.has('b'));
  
  // Проверяем статистику
  console.log('Cache stats:', cache.getStats());
  
  // Тестируем изменение размера кеша
  cache.resize(2);
  console.log('Cache after resize to 2:', cache.keys());
  
  // Очищаем кеш
  cache.clear();
  console.log('Cache after clear:', cache.keys());
  console.log('Cache size after clear:', cache.size);
  
  console.log('LRUCache test complete.');
}

// Автоматический запуск теста при импорте модуля в режиме разработки
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  window.testLRUCache = testLRUCache;
  console.log('LRUCache test function registered as window.testLRUCache()');
}