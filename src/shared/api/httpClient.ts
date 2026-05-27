import { fetchWithTimeout } from './fetchWithTimeout'

type RequestOptions = Pick<RequestInit, 'signal'>

export const httpClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    fetchWithTimeout<T>(endpoint, { signal: options?.signal }),

  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    fetchWithTimeout<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      signal: options?.signal,
    }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    fetchWithTimeout<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      signal: options?.signal,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    fetchWithTimeout<T>(endpoint, {
      method: 'DELETE',
      signal: options?.signal,
    }),
}
