import Modbus, { ModbusReadParameters } from './modbus'

interface ReturnedData {
  functionName: string
  returnedData: number[] | number | null
}

class ModbusFunctionHandler {
  async getWeight(): Promise<ReturnedData> {
    const data: ReturnedData = {
      functionName: 'getWeight',
      returnedData: null,
    }
    const requestParams: ModbusReadParameters = {
      nodeIds: [155],
      address: 3,
      quantity: 1,
    }

    const value = await Modbus['readInputRegisters'](requestParams)
    data.returnedData = Number((value[0] * 0.1).toFixed(2))

    return data
  }
}

export default new ModbusFunctionHandler()
