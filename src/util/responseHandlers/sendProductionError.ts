import errorResponse from './errorResponse'
import { AppError } from '../appError'
import { Response } from 'express'

export default function sendProductionErrors(err: AppError, res: Response) {
  return errorResponse(err, res)
}
