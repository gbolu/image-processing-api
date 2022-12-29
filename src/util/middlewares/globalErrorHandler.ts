import Environment from '../../config/env'
import debugResponse from '../responseHandlers/debugResponse'
import { AppError } from '../appError'
import { Request, Response, NextFunction } from 'express'
import sendProductionErrors from '../responseHandlers/sendProductionError'

export default async function globalErrorHandlerMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = err as AppError
  error.statusCode = err.statusCode || 500
  error.status = err.status || false

  if (Environment.Server.Environment === 'production') {
    return sendProductionErrors(error, res)
  }

  return debugResponse(error, res)
}
