import http from 'http'
import app from './app'
import Environment from './config/env'
import logger from './util/logger'

const server = http.createServer(app)

server.listen(Environment.Server.Address, () => {
  logger.info(
    `Server running at http://localhost:${Environment.Server.Address}`
  )
})

server.on('error', (err) => {
  logger.error(`Server error: ${err.message}`)
})

process.on('uncaughtException', (err) => {
  logger.error(err)
  logger.info(`Shutting down server gracefully...`)
  process.exit(1)
})

process.on('unhandledRejection', (e: Error) => {
  logger.error(`Unhandled Rejection: ${e}`)
  logger.info(`Shutting down server gracefully...`)
  process.exit(1)
})
