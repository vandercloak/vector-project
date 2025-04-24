// A simple cache service that caches data for a given TTL.
class ReportCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private ttl: number = 60 * 1000; // 1 minute TTL

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}

export default new ReportCache();
