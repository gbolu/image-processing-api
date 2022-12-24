import { ServerConfig } from './env.types'
import dotenv from 'dotenv-safe'

type Env = {
  Server: ServerConfig
}

const loadConfig = () => {
  dotenv.config()
}
loadConfig()

const Environment: Env = {
  Server: {
    Address: process.env.SERVER_ADDRESS || 3000,
    LoggerLevel: process.env.LOGGER_LEVEL || 'error',
    Environment: process.env.NODE_ENV || 'development'
  }
}

export default Environment
