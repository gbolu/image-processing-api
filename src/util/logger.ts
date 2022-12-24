import winston, { format } from 'winston'
import Environment from '../config/env'

const { combine, timestamp, json } = format

const logger = winston.createLogger({
  level: Environment.Server.LoggerLevel,
  transports: [new winston.transports.Console()],
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A'
    }),
    json()
  )
})

export default logger
