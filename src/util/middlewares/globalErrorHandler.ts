import Environment from '../../config/env'
import debugResponse from '../responseHandlers/debugResponse'
import { AppError } from '../appError'
import { Request, Response } from 'express'
import sendProductionErrors from '../responseHandlers/sendProductionError'

export default function globalErrorHandlerMiddleware(
  err: AppError,
  req: Request,
  res: Response
) {
  err.statusCode = err.statusCode || 500
  err.status = err.status || false

  if (Environment.Server.Environment === 'production') {
    return sendProductionErrors(err, res)
  }

  return debugResponse(err, res)
}
