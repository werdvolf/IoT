import { Router } from 'express'
import AlertController from '../controllers/alertController'

const router = Router()

router.post('/addAlert', AlertController.addAlert)
router.get('/getAlertById/:id', AlertController.getAlertById)
router.get('/getAllAlerts', AlertController.getAllAlerts)
router.delete('/deleteAlertById/:id', AlertController.deleteAlertById)

export default router
