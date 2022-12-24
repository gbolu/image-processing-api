import express from 'express'
import httpLogger from './util/middlewares/httpLogger'
import { AppError } from './util/appError'
import ErrorCodes from './util/errorCodes'
import globalErrorHandler from './util/middlewares/globalErrorHandler'

const app = express()

app.use(httpLogger)
app.use(express.json())

// HANDLING UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this Server!`,
      404,
      ErrorCodes.INVALID_ROUTE
    )
  )
})

app.use(globalErrorHandler)

export default app
