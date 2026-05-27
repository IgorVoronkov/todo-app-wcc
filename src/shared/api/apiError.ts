export class ApiError extends Error {
  status: number
  data: unknown

  constructor(status: number, message: string, data?: unknown, cause?: unknown) {
    super(message, { cause })
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}
