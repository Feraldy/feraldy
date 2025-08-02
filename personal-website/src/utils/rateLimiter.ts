interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  storageKey: string;
}

interface RequestRecord {
  timestamp: number;
  count: number;
}

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    const record = this.getRecord();
    
    if (now - record.timestamp > this.config.windowMs) {
      this.resetRecord(now);
      return true;
    }
    
    return record.count < this.config.maxRequests;
  }

  recordRequest(): void {
    const now = Date.now();
    const record = this.getRecord();
    
    if (now - record.timestamp > this.config.windowMs) {
      this.resetRecord(now);
    } else {
      record.count++;
      this.saveRecord(record);
    }
  }

  getRemainingRequests(): number {
    const record = this.getRecord();
    const now = Date.now();
    
    if (now - record.timestamp > this.config.windowMs) {
      return this.config.maxRequests;
    }
    
    return Math.max(0, this.config.maxRequests - record.count);
  }

  getTimeUntilReset(): number {
    const record = this.getRecord();
    const now = Date.now();
    const elapsed = now - record.timestamp;
    
    if (elapsed > this.config.windowMs) {
      return 0;
    }
    
    return this.config.windowMs - elapsed;
  }

  private getRecord(): RequestRecord {
    try {
      const stored = localStorage.getItem(this.config.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to parse rate limit record:', error);
    }
    
    return { timestamp: Date.now(), count: 0 };
  }

  private saveRecord(record: RequestRecord): void {
    try {
      localStorage.setItem(this.config.storageKey, JSON.stringify(record));
    } catch (error) {
      console.warn('Failed to save rate limit record:', error);
    }
  }

  private resetRecord(timestamp: number): void {
    this.saveRecord({ timestamp, count: 1 });
  }
}

export const tarotRateLimiter = new RateLimiter({
  maxRequests: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
  storageKey: 'tarot_rate_limit'
});