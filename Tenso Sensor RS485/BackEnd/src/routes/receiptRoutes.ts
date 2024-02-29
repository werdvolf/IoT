import { Router } from 'express'
import RecieptController from '../controllers/receiptController'

const router = Router()

router.post('/addReceipt', RecieptController.addReceipt)
router.get('/getReceiptById/:id', RecieptController.getReceiptById)
router.get('/getAllReceipts', RecieptController.getAllReceipts)
router.delete('/deleteReceiptById/:id', RecieptController.deleteReceiptById)

export default router
