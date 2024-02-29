import { Router } from 'express'
import ReportController from '../controllers/reportController'

const router = Router()

router.post('/addReport', ReportController.addReport)
router.get('/getReportById/:id', ReportController.getReportById)
router.get('/getAllReports', ReportController.getAllReports)
router.delete('/deleteReportById/:id', ReportController.deleteReportById)
router.get(
  '/updateEndTimeOfReportById/:id',
  ReportController.updateEndTimeOfReportById
)

export default router
