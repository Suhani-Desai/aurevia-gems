export class AppError extends Error {
  statusCode: number;
  success: false;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.success = false;
  }
}
