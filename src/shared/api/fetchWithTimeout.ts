import { BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT_MS } from './constants'
import { ApiError } from './apiError'

export async function fetchWithTimeout<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController()
  const controllerAbort = () => controller.abort()
  const timeoutId = setTimeout(controllerAbort, REQUEST_TIMEOUT_MS)

  options.signal?.addEventListener('abort', controllerAbort)

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
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
    if (error instanceof DOMException && error.name === 'AbortError') {
      if (options.signal?.aborted) throw error

      throw new ApiError(408, 'Request timeout', { originalMessage: error.message })
    }

    if (error instanceof TypeError) {
      throw new ApiError(0, 'Network error', { originalMessage: error.message })
    }

    throw error
  } finally {
    clearTimeout(timeoutId)
    options.signal?.removeEventListener('abort', controllerAbort)
  }
}
