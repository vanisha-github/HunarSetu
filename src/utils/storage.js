// Safe localStorage helpers with fallback defaults.

export function safeGet(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null || raw === undefined) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function safeRemove(key) {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}
