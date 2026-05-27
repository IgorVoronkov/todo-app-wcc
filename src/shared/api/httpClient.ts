import { fetchWithTimeout } from './fetchWithTimeout'

export const httpClient = {
  get: <T>(endpoint: string) => fetchWithTimeout<T>(endpoint),

  post: <T>(endpoint: string, body: unknown) =>
    fetchWithTimeout<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown) =>
    fetchWithTimeout<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) => fetchWithTimeout<T>(endpoint, { method: 'DELETE' }),
}
