import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LRUCache } from './LRUCache.js';

describe('LRUCache', () => {
  let cache;
  
  beforeEach(() => {
    cache = new LRUCache(3);
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
});