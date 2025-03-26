import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LRUCache } from './LRUCache';

describe('LRUCache', () => {
  let cache: LRUCache<string, number>;
  
  beforeEach(() => {
    cache = new LRUCache<string, number>(3);
  });

  it('should create a cache with the specified size', () => {
    expect(cache.capacity).toBe(3);
    expect(cache.size).toBe(0);
  });
  
  it('should add items to the cache', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    
    expect(cache.size).toBe(2);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);
  });
  
  it('should return undefined for non-existent keys', () => {
    expect(cache.get('notexist')).toBeUndefined();
  });
  
  it('should update items in the cache', () => {
    cache.set('a', 1);
    cache.set('a', 2);
    
    expect(cache.size).toBe(1);
    expect(cache.get('a')).toBe(2);
  });
  
  it('should evict the least recently used item when capacity is exceeded', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);
    
    // Cache is now full with a, b, c
    
    // Access 'a' to make it the most recently used
    cache.get('a');
    
    // Add a new item, should evict 'b' as it's now the LRU
    cache.set('d', 4);
    
    expect(cache.size).toBe(3);
    expect(cache.has('a')).toBe(true);
    expect(cache.has('b')).toBe(false); // b should be evicted
    expect(cache.has('c')).toBe(true);
    expect(cache.has('d')).toBe(true);
  });
  
  it('should call onEvict callback when an item is evicted', () => {
    const onEvict = vi.fn();
    const cacheWithCallback = new LRUCache<string, number>(2, onEvict);
    
    cacheWithCallback.set('a', 1);
    cacheWithCallback.set('b', 2);
    cacheWithCallback.set('c', 3); // This should evict 'a'
    
    expect(onEvict).toHaveBeenCalledTimes(1);
    expect(onEvict).toHaveBeenCalledWith('a', 1);
  });
  
  it('should clear the cache', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    
    cache.clear();
    
    expect(cache.size).toBe(0);
    expect(cache.has('a')).toBe(false);
    expect(cache.has('b')).toBe(false);
  });
  
  it('should resize the cache', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);
    
    // Resize to smaller capacity
    cache.resize(2);
    
    expect(cache.capacity).toBe(2);
    expect(cache.size).toBe(2);
    // The oldest item 'a' should be evicted
    expect(cache.has('a')).toBe(false);
    
    // Resize to larger capacity
    cache.resize(4);
    
    expect(cache.capacity).toBe(4);
    expect(cache.size).toBe(2);
  });
  
  it('should throw an error when creating a cache with size <= 0', () => {
    expect(() => new LRUCache(0)).toThrow();
    expect(() => new LRUCache(-1)).toThrow();
  });
  
  it('should track statistics correctly', () => {
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);
    
    cache.get('a'); // Hit
    cache.get('b'); // Hit
    cache.get('notexist'); // Miss
    
    cache.set('d', 4); // Evicts the LRU item
    
    const stats = cache.getStats();
    
    expect(stats.hits).toBe(2);
    expect(stats.misses).toBe(1);
    expect(stats.evictions).toBe(1);
    expect(stats.hitRate).toBeCloseTo(2/3);
    expect(stats.fillRate).toBeCloseTo(1);
  });
  
  it('should reset statistics', () => {
    cache.set('a', 1);
    cache.get('a'); // Hit
    cache.get('notexist'); // Miss
    
    cache.resetStats();
    
    const stats = cache.getStats();
    
    expect(stats.hits).toBe(0);
    expect(stats.misses).toBe(0);
    expect(stats.evictions).toBe(0);
  });
});