/**
 * A tiny external store over localStorage, read via useSyncExternalStore so
 * components can subscribe to browser-only state without the
 * read-then-setState-in-an-effect pattern (which double-renders and trips
 * react-hooks/set-state-in-effect). getServerSnapshot returns the fallback,
 * matching SSR output; the real value appears on the client's first paint.
 */
export interface LocalStore<T> {
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  subscribe: (callback: () => void) => () => void;
  set: (value: T) => void;
}

export function createLocalStore<T>(key: string, fallback: T): LocalStore<T> {
  let cached: T = fallback;
  let cachedRaw: string | null = null;
  const listeners = new Set<() => void>();

  function readFromStorage(): T {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === cachedRaw) return cached;
      cachedRaw = raw;
      cached = raw ? (JSON.parse(raw) as T) : fallback;
      return cached;
    } catch {
      return fallback;
    }
  }

  function notify() {
    listeners.forEach((listener) => listener());
  }

  return {
    getSnapshot: readFromStorage,
    getServerSnapshot: () => fallback,
    subscribe(callback) {
      listeners.add(callback);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) notify();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(callback);
        window.removeEventListener("storage", onStorage);
      };
    },
    set(value) {
      cached = value;
      cachedRaw = JSON.stringify(value);
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(key, cachedRaw);
        } catch {
          // Storage unavailable (private mode, quota) — state stays in-memory for this session.
        }
      }
      notify();
    },
  };
}
