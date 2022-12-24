import morgan from 'morgan'

const httpLoggerMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms'
)

export default httpLoggerMiddleware
