import { Router } from 'express'
import modbusRoutes from './modbusRoutes'
import receiptRoutes from './receiptRoutes'
import alertRoutes from './alertRoutes'
import reportRoutes from './reportRoutes'

const router = Router()

router.use('/modbus', modbusRoutes)

router.use('/receipt', receiptRoutes)

router.use('/alert', alertRoutes)

router.use('/report', reportRoutes)

export default router
