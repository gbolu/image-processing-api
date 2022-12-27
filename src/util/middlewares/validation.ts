import joi, { ValidationError } from 'joi'
import { AppError } from '../appError'
import ErrorCodes from '../errorCodes'
import { Request, Response, NextFunction } from 'express'
import errorResponse from '../responseHandlers/errorResponse'

export type ValidationResult = {
  error?: null | AppError
}

export const VALIDATION_TYPE = {
  QUERY: 'QUERY',
  BODY: 'BODY'
} as const

type ObjectValues<T> = T[keyof T]
export type ValidationType = ObjectValues<typeof VALIDATION_TYPE>

export const validateRequest =
  (schema: joi.ObjectSchema, validationType: ValidationType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validationType === VALIDATION_TYPE.BODY) {
        await schema.validateAsync(req.body)
      } else {
        await schema.validateAsync(req.query)
      }

      return next()
    } catch (error) {
      const { message } = error as ValidationError

      return errorResponse(
        new AppError(message, 400, ErrorCodes.VALIDATION_ERROR),
        res
      )
    }
  }
