export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
}

export const REQUEST_TIMEOUT_MS = 10_000 // 10 секунд
