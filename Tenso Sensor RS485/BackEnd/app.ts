import express from 'express'
import cors from 'cors'

import errorHandler from './src/middleware/errorHandler'
import routes from './src/routes'
import WebSocketService from './src/services/wsService'

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
}

const app = express()
const wssService = new WebSocketService()

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.use((_req, res) => {
  return res.status(404).json({ message: 'not found' })
})
app.use(errorHandler)

export { app }
