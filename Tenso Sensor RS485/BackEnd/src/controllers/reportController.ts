import { Request, Response } from 'express'
import ReportService from '../services/reportService'
import { handleRequestError } from '../Error/Error'

class ReportController {
  public async addReport(req: Request, res: Response): Promise<void> {
    try {
      const { receiptId } = req.body
      const newReport = await ReportService.addReport(receiptId)

      res
        .status(201)
        .json({ message: 'Report created successfully', report: newReport })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async getReportById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      if (id) {
        const report = await ReportService.getReportByID(parseInt(id, 10))
        if (report) {
          res.status(200).json({
            message: `Return report with id=${id}`,
            receipt: report,
          })
        } else {
          res.status(404).json({ error: `Report not found with id=${id}` })
        }
      }
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async getAllReports(req: Request, res: Response): Promise<void> {
    try {
      const reports = await ReportService.getAllReports()
      res.status(200).json({
        message: 'Returned all receipts',
        receipts: reports,
      })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async deleteReportById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (id) {
        await ReportService.deleteReportById(parseInt(id, 10))
        res.status(200).json({
          message: `Deleted report with ID ${id}`,
        })
      }
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async updateEndTimeOfReportById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params
      if (id) {
        await ReportService.setEndTimeOfReportById(parseInt(id, 10))
        res.status(200).json({
          message: `Uptadet endTime of report with ID ${id}`,
        })
      }
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }
}

export default new ReportController()
