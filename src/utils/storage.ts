/**
 * Storage Utility for Safe JSON LocalStorage access
 */

export function safeGetJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[storage] Failed to parse localStorage key "${key}":`, err);
    return fallback;
  }
}

export function safeSetJSON<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`[storage] Failed to set localStorage key "${key}":`, err);
    return false;
  }
}

export function safeRemove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[storage] Failed to remove localStorage key "${key}":`, err);
  }
}
