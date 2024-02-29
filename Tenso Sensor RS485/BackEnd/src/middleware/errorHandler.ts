import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  console.error(err)
  return res.status(500).json(err)
}

export default errorHandler
