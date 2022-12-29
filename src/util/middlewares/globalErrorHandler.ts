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
  err.statusCode = err.statusCode || 500
  err.status = err.status || false

  if (Environment.Server.Environment === 'production') {
    return sendProductionErrors(err, res)
  }

  return debugResponse(err, res)
}
