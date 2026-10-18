import { useCallback, useEffect, useState } from 'react'
import { safeGet, safeSet } from '../utils/storage'

/**
 * Persist a piece of React state in localStorage with safe parsing.
 * Usage: const [value, setValue] = useLocalStorage('my.key', initialValue)
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => safeGet(key, initialValue))

  useEffect(() => {
    safeSet(key, value)
  }, [key, value])

  const update = useCallback((next) => {
    setValue((prev) => (typeof next === 'function' ? next(prev) : next))
  }, [])

  const remove = useCallback(() => {
    setValue(initialValue)
  }, [initialValue])

  return [value, update, remove]
}
