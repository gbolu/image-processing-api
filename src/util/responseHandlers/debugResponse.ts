import { Response } from 'express'
import { AppError } from '../appError'

export default function debugResponse(error: AppError, res: Response) {
  return res.status(error.statusCode).json({
    status: error.status,
    errorCode: error.errorCode,
    message: error.message,
    error,
    stack: error.stack
  })
}
