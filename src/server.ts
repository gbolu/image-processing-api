import http from 'http'
import app from './app'
import Environment from './config/env'

const server = http.createServer(app)

server.listen(Environment.Server.Address, () => {
  console.info(`Server running at http://localhost:${Environment.Server.Address}`)
})

server.on('error', (e) => {
  console.info(`Server error: ${e.message}`)
})

process.on('uncaughtException', (e) => {
  console.info(`Uncaught Exception: ${e.message}`)
})

process.on('unhandledRejection', (e) => {
  console.info(`Unhandled Rejection: ${e}`)
})

process.on('exit', (code) => {
  console.info(`Shutting down server in response to exit code: ${code}`)
})
