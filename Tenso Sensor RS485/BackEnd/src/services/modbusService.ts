import ModbusRequest, {
  saveModbusRequestToDatabase,
  getAllModbusRequests,
} from '../models/Modbus'

import { handleServiceError, ValidationError } from '../Error/Error'

import Modbus, {
  ModbusReadParameters,
  ModbusWriteParameters,
} from '../utils/modbus'

type readFunctions =
  | 'readCoils'
  | 'readDiscreteInputs'
  | 'readHoldingRegisters'
  | 'readInputRegisters'

type writeFunctions =
  | 'writeSingleCoil'
  | 'writeSingleRegister'
  | 'writeMultipleCoil'
  | 'writeMultipleRegisters'

class ModbusService {
  public async readOperation(
    readOperation: readFunctions,
    nodeIds: number[],
    address: number,
    quantity: number
  ): Promise<ModbusRequest> {
    try {
      if (!nodeIds || !address || !quantity || !readOperation) {
        throw new ValidationError('Invalid Modbus request input')
      } else {
        const requestParameters: ModbusReadParameters = {
          nodeIds: nodeIds,
          address: address,
          quantity: quantity,
        }
        const modbusData = await Modbus[readOperation](requestParameters)
        const startExecutionTime = new Date()
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')
        if (typeof modbusData === 'string') {
          const error = `Invalid input data: ${modbusData}`
          const modbusRequest = new ModbusRequest(
            readOperation,
            startExecutionTime,
            error,
            null
          )
          saveModbusRequestToDatabase(modbusRequest)
          throw new ValidationError(error)
        } else {
          const modbusRequest = new ModbusRequest(
            readOperation,
            startExecutionTime,
            'completed',
            modbusData
          )
          console.log(modbusRequest)

          saveModbusRequestToDatabase(modbusRequest)
          return modbusRequest
        }
      }
    } catch (error) {
      throw handleServiceError(error)
    }
  }

  public async writeOperation(
    writeOperation: writeFunctions,
    nodeIds: number[],
    address: number,
    values: any[] | any
  ): Promise<any> {
    try {
      if (!nodeIds || !address || values == null || !writeOperation) {
        throw new ValidationError('Invalid Modbus request input ' + values)
      } else {
        const requestParameters: ModbusWriteParameters = {
          nodeIds: nodeIds,
          address: address,
          values: values,
        }
        const modbusData = await Modbus[writeOperation](requestParameters)
        const startExecutionTime = new Date()
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')
        if (
          typeof modbusData === 'string' &&
          modbusData.includes('exception')
        ) {
          const error = `Invalid input data: ${modbusData}`
          const modbusRequest = new ModbusRequest(
            writeOperation,
            startExecutionTime,
            error,
            null
          )
          saveModbusRequestToDatabase(modbusRequest)
          throw new ValidationError(error)
        } else {
          const modbusRequest = new ModbusRequest(
            writeOperation,
            startExecutionTime,
            'completed',
            modbusData
          )
          saveModbusRequestToDatabase(modbusRequest)
          return modbusRequest
        }
      }
    } catch (error) {
      handleServiceError(error)
      throw error
    }
  }

  public async getAllModbusRequests(): Promise<ModbusRequest[] | null> {
    return getAllModbusRequests()
  }
}

export default new ModbusService()
