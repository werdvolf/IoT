import { Request, Response } from 'express'
import ModbusService from '../services/modbusService'
import { handleRequestError } from '../Error/Error'

class ModbusController {
  public async read(req: Request, res: Response): Promise<void> {
    try {
      const { readOperation, nodeIds, address, quantity } = req.body
      const modbusData = await ModbusService.readOperation(
        readOperation,
        nodeIds,
        address,
        quantity
      )
      res.status(200).json({
        message: 'Perform reading operation successfully',
        modbusData: modbusData,
      })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async write(req: Request, res: Response): Promise<void> {
    try {
      const { writeOperation, nodeIds, address, values } = req.body
      const modbusData = await ModbusService.writeOperation(
        writeOperation,
        nodeIds,
        address,
        values
      )
      res.status(200).json({
        message: 'Perform write operation successfully',
        modbusData: modbusData,
      })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }
  public async getAllModbusRequests(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const modbusData = await ModbusService.getAllModbusRequests()
      res.status(200).json({
        message: 'Returned all performed operations',
        modbusData: modbusData,
      })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }
}

export default new ModbusController()
