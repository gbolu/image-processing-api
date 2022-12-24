import { Response } from 'express'

export default function successResponse(
  data: unknown,
  message: string,
  statusCode: number,
  res: Response
) {
  return res.status(statusCode).json({
    status: true,
    statusCode: res.statusCode,
    message,
    data
  })
}
