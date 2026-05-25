// Кастомный класс ошибки — чтобы можно было различать
// HTTP-ошибки (404, 500) от сетевых (нет интернета)
export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}
