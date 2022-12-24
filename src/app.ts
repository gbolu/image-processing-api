import express from 'express'
import httpLoggerMiddleware from './util/middlewares/httpLogger'

const app = express()

app.use(httpLoggerMiddleware)
app.use(express.json())

export default app
