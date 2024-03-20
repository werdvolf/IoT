import { Router } from 'express'
import modbusRoutes from './modbusRoutes'
import recipeRoutes from './recipeRoutes'
import alertRoutes from './alertRoutes'
import reportRoutes from './reportRoutes'

const router = Router()

router.use('/modbus', modbusRoutes)

router.use('/recipe', recipeRoutes)

router.use('/alert', alertRoutes)

router.use('/report', reportRoutes)

export default router
