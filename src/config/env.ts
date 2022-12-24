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
    Address: process.env.SERVER_ADDRESS || 3000
  }
}

export default Environment
