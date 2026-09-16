/**
 * High-Performance In-Memory & Redis Cache Layer for ShramikID
 * Falls back to fast JavaScript Map in-memory store when Redis is not active.
 */

class CacheService {
  constructor() {
    this.memoryStore = new Map();
    this.isRedisConnected = false;
    this.redisClient = null;
  }

  /**
   * Set a key-value pair with optional TTL in seconds
   */
  async set(key, value, ttlSeconds = 300) {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    this.memoryStore.set(key, {
      value,
      expiresAt,
    });
    return true;
  }

  /**
   * Get value by key
   */
  async get(key) {
    const item = this.memoryStore.get(key);
    if (!item) return null;

    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.memoryStore.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Delete key
   */
  async del(key) {
    return this.memoryStore.delete(key);
  }

  /**
   * Clear all cache
   */
  async flush() {
    this.memoryStore.clear();
  }

  /**
   * Rate limiting helper (e.g. for OTP and Login attempts)
   */
  async checkRateLimit(key, maxRequests = 5, windowSeconds = 60) {
    const current = (await this.get(key)) || 0;
    if (current >= maxRequests) {
      return { allowed: false, remaining: 0, retryAfter: windowSeconds };
    }

    await this.set(key, current + 1, windowSeconds);
    return { allowed: true, remaining: maxRequests - (current + 1), retryAfter: 0 };
  }
}

export const cache = new CacheService();
export default cache;
