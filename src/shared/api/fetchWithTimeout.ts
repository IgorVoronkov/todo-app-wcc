import { BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT_MS } from './constants'
import { ApiError } from './apiError'

export async function fetchWithTimeout<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const signals = [AbortSignal.timeout(REQUEST_TIMEOUT_MS)]
  if (options.signal) signals.push(options.signal)
  const combinedSignal = AbortSignal.any(signals)

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: combinedSignal,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const data: unknown = await response.json().catch(() => null)
      throw new ApiError(response.status, response.statusText, data)
    }

    if (response.status === 204) return null as T

    return response.json() as T
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new ApiError(408, 'Request timeout', { originalMessage: error.message }, error)
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }

    if (error instanceof TypeError) {
      throw new ApiError(0, 'Network error', { originalMessage: error.message }, error)
    }

    throw error
  }
}
