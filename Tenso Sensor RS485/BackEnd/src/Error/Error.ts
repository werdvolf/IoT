import { Response } from 'express'

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class ServiceException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ServiceException'
  }
}
export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export function handleRequestError(error: any, res: Response): void {
  if (error instanceof ValidationError) {
    res.status(400).json({ error: error.message })
  } else if (error instanceof ServiceException) {
    res.status(500).json({ error: 'Internal Server Error' })
  } else {
    res.status(500).json({ error: error.message })
  }
}

export function handleServiceError(error: any): Error {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.message)
    return error
  } else if (error instanceof DatabaseError) {
    console.error('Database error:', error.message)
    return new ServiceException('Error processing receipt data')
  } else {
    return error
  }
}
