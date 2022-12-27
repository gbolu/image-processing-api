export type ErrorResponseObject = {
  status: boolean
  statusCode: number
  errorCode: string
  message: string
}

export type SuccessResponseObject = {
  status: boolean
  statusCode: number
  data: unknown
  message: string
}
