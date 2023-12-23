import ModbusRTU from 'modbus-serial'

const timeoutMs: number = 3000

export interface ModbusConnectionSettings {
  port: string
  baudRate: number
  dataBits: number
  stopBits: number
  parity: 'none' | 'even' | 'mark' | 'odd' | 'space' | undefined
}

export interface ModbusRequestParameters {
  nodeIds: number[]
  address: number
  quantity: number
}

export interface ModbusWriteParameters {
  nodeIds: number[]
  address: number
  values: string | boolean[] | number
}

export class ModbusFunctions {
  private client: ModbusRTU

  constructor() {
    this.client = new ModbusRTU()
  }

  private async connect(
    settings: ModbusConnectionSettings,
  ): Promise<void | string> {
    try {
      await this.client.connectRTUBuffered(settings.port, {
        baudRate: settings.baudRate,
        dataBits: settings.dataBits,
        stopBits: settings.stopBits,
        parity: settings.parity,
      })
      console.log(`Modbus connection opened successfully.`)
    } catch (error: any) {
      console.log(`Error during Modbus connection: ${error}`)
      return error
    }
  }

  async disconnect(): Promise<void> {
    return new Promise(resolve => {
      this.client.close(() => {
        console.log(`Modbus connection closed.`)
        resolve()
      })
    })
  }

  private async performReadOperation(
    params: ModbusRequestParameters,
    operation: (addr: number, quant: number) => Promise<any>,
    logMessage: string,
  ): Promise<any[]> {
    let resultArray: any[] = []
    for (let node of params.nodeIds) {
      this.client.setID(node)
      try {
        // Create a promise that resolves when the operation is completed
        const operationPromise = operation(params.address, params.quantity)

        // Use Promise.race to race the operation promise against a timeout promise
        const result = await Promise.race([
          operationPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeoutMs),
          ),
        ])

        if (result) {
          console.log(
            `${logMessage} at address ${params.address}:`,
            result.data,
          )
          resultArray = result.data
        }
      } catch (err) {
        return this.handleError(err)
      }
      return resultArray
    }
  }

  private async performWriteOperation(
    params: ModbusWriteParameters,
    operation: (addr: number, val: any) => Promise<any[]>,
    logMessage: string,
  ): Promise<any> {
    for (let node of params.nodeIds) {
      this.client.setID(node)
      try {
        // Create a promise that resolves when the operation is completed
        const operationPromise = operation(params.address, params.values)

        // Use Promise.race to race the operation promise against a timeout promise
        const result = await Promise.race([
          operationPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeoutMs),
          ),
        ])

        if (result) {
          console.log(`${logMessage} at address ${params.address} success`)
          return `${logMessage} at address ${params.address} success`
        }
      } catch (err) {
        return this.handleError(err)
      }
    }
  }

  async connectAndPerformOperation(
    settings: ModbusConnectionSettings,
    operation: () => Promise<any[]>,
  ): Promise<any[]> {
    try {
      await this.connect(settings)
      return await operation()
    } finally {
      await this.disconnect()
    }
  }

  async readCoils(
    params: ModbusRequestParameters,
    settings: ModbusConnectionSettings,
  ): Promise<any[]> {
    return await this.connectAndPerformOperation(settings, async () => {
      return await this.performReadOperation(
        params,
        this.client.readCoils.bind(this.client),
        'Read Coils',
      )
    })
  }

  async readDiscreteInputs(
    params: ModbusRequestParameters,
    settings: ModbusConnectionSettings,
  ): Promise<any[]> {
    return this.connectAndPerformOperation(settings, async () => {
      return this.performReadOperation(
        params,
        this.client.readDiscreteInputs.bind(this.client),
        'Read Discrete Inputs',
      )
    })
  }

  async readHoldingRegisters(
    params: ModbusRequestParameters,
    settings: ModbusConnectionSettings,
  ): Promise<any[]> {
    return await this.connectAndPerformOperation(settings, async () => {
      return await this.performReadOperation(
        params,
        this.client.readHoldingRegisters.bind(this.client),
        'Read Holding Registers',
      )
    })
  }

  async readInputRegisters(
    params: ModbusRequestParameters,
    settings: ModbusConnectionSettings,
  ): Promise<any[]> {
    return this.connectAndPerformOperation(settings, async () => {
      return this.performReadOperation(
        params,
        this.client.readInputRegisters.bind(this.client),
        'Read Input Registers',
      )
    })
  }

  async writeSingleCoil(
    params: ModbusWriteParameters,
    settings: ModbusConnectionSettings,
  ): Promise<any> {
    return await this.connectAndPerformOperation(settings, async () => {
      // const paramsBoolArray = Array.from({ length: 8 }).map((_, index) => {
      //   return (
      //     params.address === index &&
      //     (params.values[0] === '1' || params.values[0] === true)
      //   )
      // })
      // console.log(paramsBoolArray)
      // params.values = paramsBoolArray
      params.values = 0
      return await this.performWriteOperation(
        params,
        this.client.writeCoil.bind(this.client),
        'Write Single Coil',
      )
    })
  }

  async writeSingleRegister(
    params: ModbusWriteParameters,
    settings: ModbusConnectionSettings,
  ): Promise<any> {
    return await this.connectAndPerformOperation(settings, async () => {
      return await this.performWriteOperation(
        params,
        this.client.writeRegister.bind(this.client),
        'Write Single Register',
      )
    })
  }

  async writeMultipleRegisters(
    params: ModbusWriteParameters,
    settings: ModbusConnectionSettings,
  ): Promise<any> {
    return await this.connectAndPerformOperation(settings, async () => {
      return await this.performWriteOperation(
        params,
        this.client.writeRegisters.bind(this.client),
        'Write Multiple Registers',
      )
    })
  }

  private handleError(err: any): any {
    console.log(err.message)
    if (err.errno == 'ECONNREFUSED') {
      this.client.close(() => null)
    }
    return err.message
  }
}
