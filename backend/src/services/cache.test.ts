import { describe, expect, beforeEach, test } from "@jest/globals";
import cache from "./cache";

describe("Cache Service", () => {
  beforeEach(() => {
    // Clear the cache before each test
    // This is a hack since we don't have direct access to the Map
    Object.keys(cache).forEach((key) => {
      if (cache.get(key)) {
        cache.set(key, null);
      }
    });
  });

  test("should store and retrieve values", () => {
    cache.set("test-key", { foo: "bar" });
    expect(cache.get("test-key")).toEqual({ foo: "bar" });
  });

  test("should return null for non-existent keys", () => {
    expect(cache.get("non-existent")).toBeNull();
  });

  test("should handle expired items", async () => {
    // Set a very short TTL for this test by accessing private property
    const originalTtl = (cache as any).ttl;
    (cache as any).ttl = 10; // 10ms TTL

    cache.set("expires-quickly", { data: "temporary" });
    expect(cache.get("expires-quickly")).toEqual({ data: "temporary" });

    // Wait for cache to expire
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(cache.get("expires-quickly")).toBeNull();

    // Restore original TTL
    (cache as any).ttl = originalTtl;
  });
});
