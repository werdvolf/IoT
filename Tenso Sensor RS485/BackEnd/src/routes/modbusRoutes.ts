import { Router } from 'express'
import ModbusController from '../controllers/modbusController'

const router = Router()

router.post('/read', ModbusController.read)

router.post('/write', ModbusController.write)

router.get('/getAllModbusRequests', ModbusController.getAllModbusRequests)

export default router
