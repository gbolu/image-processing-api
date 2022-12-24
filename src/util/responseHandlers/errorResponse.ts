import { Response } from 'express'
import { AppError } from '../appError'

export default function errorResponse(err: AppError, res: Response) {
  return res.status(err.statusCode).json({
    status: false,
    statusCode: err.statusCode,
    errorCode: err.errorCode,
    message: err.message
  })
}
