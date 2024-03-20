import Report, {
  saveReportToDatabase,
  getReportById,
  getAllReports,
  deleteReportById,
  setReportEndTimeById,
} from '../models/Report'

import { getRecipeById } from '../models/Recipe'

import {
  ValidationError,
  DatabaseError,
  ServiceException,
} from '../Error/Error'

class ReportService {
  public async addReport(receiptId: number): Promise<Report> {
    try {
      if (!receiptId) {
        throw new ValidationError('Invalid report id input')
      } else {
        const receipt = await getRecipeById(receiptId)
        if (!receipt) {
          const error = new DatabaseError(`No such report with id ${receiptId}`)
          throw error
        }
      }
      const startTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
      const newReport: Report = new Report(receiptId, startTime)
      await saveReportToDatabase(newReport)

      return newReport
    } catch (error) {
      // Service-level error handling
      if (error instanceof ValidationError) {
        // Log validation error or handle as needed
        console.error('Validation error:', error.message)
        throw error
      } else if (error instanceof DatabaseError) {
        // Log detailed error information, handle retries, etc.
        console.error('Database error:', error.message)
        throw new ServiceException('Error processing report data')
      } else {
        // Re-throw other types of errors
        throw error
      }
    }
  }
  public async getReportByID(id: number): Promise<Report | null> {
    return await getReportById(id)
  }
  public async getAllReports(): Promise<Report[]> {
    return await getAllReports()
  }
  public async deleteReportById(id: number): Promise<void> {
    return await deleteReportById(id)
  }
  public async setEndTimeOfReportById(id: number): Promise<void> {
    const endTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    return await setReportEndTimeById(id, endTime)
  }
}

export default new ReportService()
