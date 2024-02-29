import ModbusRTU from 'modbus-serial'

export interface ModbusConnectionSettings {
  port: string
  baudRate: number
  dataBits: number
  stopBits: number
  parity: 'none' | 'even' | 'mark' | 'odd' | 'space' | undefined
}

//Connection settings
type parity = 'none' | 'even' | 'mark' | 'odd' | 'space' | undefined
const connectionSettings: ModbusConnectionSettings = {
  port: process.env.MODBUS_PORT || 'COM6',
  baudRate: parseInt(process.env.MODBUS_PORT || '9600', 10),
  dataBits: parseInt(process.env.MODBUS_PORT || '8', 10),
  stopBits: parseInt(process.env.MODBUS_PORT || '1', 10),
  parity: process.env.MODBUS_PORT as parity,
}

export interface ModbusReadParameters {
  nodeIds: number[] // IDs of nodes(devices)
  address: number // adress of register
  quantity: number // quntity of returned elements
}

export interface ModbusWriteParameters {
  nodeIds: number[] // IDs of nodes(devices)
  address: number // adress of register
  values: boolean[] | number[] // values to write
}

class Modbus {
  private static instance: Modbus

  private client: ModbusRTU
  private timeoutMs: number

  private constructor() {
    this.client = new ModbusRTU()
    this.timeoutMs = 3000 // Time while trying to recieve data from Modbus

    this.connect(connectionSettings) // Connection via pc port and other settings
  }

  //Get Singltone Modbus instance
  public static getInstance(): Modbus {
    if (!Modbus.instance) {
      Modbus.instance = new Modbus()
    }
    return Modbus.instance
  }

  // Connect function
  private async connect(
    settings: ModbusConnectionSettings
  ): Promise<void | string> {
    try {
      await this.client.connectRTUBuffered(settings.port, {
        baudRate: settings.baudRate,
        dataBits: settings.dataBits,
        stopBits: settings.stopBits,
        parity: settings.parity,
      })
      console.log('Modbus connection opened successfully.')
    } catch (error: any) {
      console.error('Error during Modbus connection:', error)
      return error
    }
  }

  // Disconnect function
  async disconnect(): Promise<void> {
    return new Promise(resolve => {
      this.client.close(() => {
        console.log('Modbus connection closed.')
        resolve()
      })
    })
  }

  /**
   * Returns result of Modbus read operation from list of devices(nodeIds)
   * @param params - params of ModbusRTU device to read from
   * @param operation - callback of read function
   * @param logMessage - Loging message which contains name of read function
   * @returns The result of performing read operation: array[bollean | number],
   *          if occur error return string
   */
  private async performReadOperation(
    params: ModbusReadParameters,
    operation: (addr: number, quant: number) => Promise<any>,
    logMessage: string
  ): Promise<any> {
    const resultArray: any[] = []
    for (const node of params.nodeIds) {
      this.client.setID(node)
      try {
        const operationPromise = operation(params.address, params.quantity)
        const result = await Promise.race([
          operationPromise,
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error(`Timeout after ${this.timeoutMs}ms`)),
              this.timeoutMs
            )
          ),
        ])

        if (result) {
          console.log(
            `${logMessage} at address ${params.address}:`,
            result.data
          )
          resultArray.push(...result.data)
        }
      } catch (err) {
        return this.handleError(err)
      }
    }
    return resultArray
  }

  /**
   * Returns result of Modbus write operation from list of devices(nodeIds)
   * @param params - params of ModbusRTU device
   * @param operation - callback of read function
   * @param logMessage - Loging message which contains name of read function
   * @returns The result of performing write operation: string,
   *          if error also returns string
   */
  private async performWriteOperation(
    params: ModbusWriteParameters,
    operation: (addr: number, val: any) => Promise<any>,
    logMessage: string
  ): Promise<any> {
    for (const node of params.nodeIds) {
      this.client.setID(node)
      try {
        const operationPromise = operation(params.address, params.values)
        const result = await Promise.race([
          operationPromise,
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error(`Timeout after ${this.timeoutMs}ms`)),
              this.timeoutMs
            )
          ),
        ])

        if (result) {
          console.log(
            `${logMessage} values ${params.values} at address ${params.address} success`
          )
          return `${logMessage} values ${params.values} at address ${params.address} success`
        }
      } catch (err) {
        return this.handleError(err)
      }
    }
  }
  /**
   * Handle error and close connection, if it occur
   * @param err - error message
   * @returns The Error message
   */
  private handleError(err: any): any {
    console.error(err.message)
    if (err.errno === 'ECONNREFUSED') {
      this.client.close(() => null)
    }
    return err.message
  }

  /**
   * Perform operation(read/write), if no connection connect to Modbus Device
   * @param operation callback
   * @returns The result of operation or error
   */
  async connectAndPerformOperation(
    operation: () => Promise<any[]>
  ): Promise<any[]> {
    try {
      if (!this.client.isOpen) {
        await this.connect(connectionSettings)
      }
      return await operation()
    } catch (error: any) {
      if (!this.client.isOpen) {
        await this.disconnect()
      }
      return error
    } finally {
      //TODO
    }
  }

  async readCoils(params: ModbusReadParameters): Promise<any[]> {
    return this.connectAndPerformOperation(async () =>
      this.performReadOperation(
        params,
        this.client.readCoils.bind(this.client),
        'Read Coils'
      )
    )
  }

  async readDiscreteInputs(params: ModbusReadParameters): Promise<any[]> {
    return this.connectAndPerformOperation(async () =>
      this.performReadOperation(
        params,
        this.client.readDiscreteInputs.bind(this.client),
        'Read Discrete Inputs'
      )
    )
  }

  async readHoldingRegisters(params: ModbusReadParameters): Promise<any[]> {
    return this.connectAndPerformOperation(async () =>
      this.performReadOperation(
        params,
        this.client.readHoldingRegisters.bind(this.client),
        'Read Holding Registers'
      )
    )
  }

  async readInputRegisters(params: ModbusReadParameters): Promise<any[]> {
    return this.connectAndPerformOperation(async () =>
      this.performReadOperation(
        params,
        this.client.readInputRegisters.bind(this.client),
        'Read Input Registers'
      )
    )
  }

  async writeSingleCoil(params: ModbusWriteParameters): Promise<any> {
    if (Array.isArray(params.values)) {
      throw new Error('Value must be not an array')
    } else if (typeof params.values != 'boolean') {
      throw new Error('Value must be boolean')
    }
    return this.connectAndPerformOperation(async () =>
      this.performWriteOperation(
        params,
        this.client.writeCoil.bind(this.client),
        'Write Single Coil'
      )
    )
  }

  async writeMultipleCoil(params: ModbusWriteParameters): Promise<any> {
    if (!Array.isArray(params.values)) {
      throw new Error('Value must be an array')
    } else {
      params.values.map((el, index) => {
        if (typeof el != 'boolean') {
          throw new Error('Value must be a boolean, index=' + index)
        }
      })
    }
    return this.connectAndPerformOperation(async () =>
      this.performWriteOperation(
        params,
        this.client.writeCoils.bind(this.client),
        'Write Multiple Coil'
      )
    )
  }

  async writeSingleRegister(params: ModbusWriteParameters): Promise<any> {
    if (Array.isArray(params.values)) {
      throw new Error('Value must be not an array')
    } else if (typeof params.values != 'number') {
      throw new Error('Value must be a number')
    }
    return this.connectAndPerformOperation(async () =>
      this.performWriteOperation(
        params,
        this.client.writeRegister.bind(this.client),
        'Write Single Register'
      )
    )
  }

  async writeMultipleRegisters(params: ModbusWriteParameters): Promise<any> {
    if (!Array.isArray(params.values)) {
      throw new Error('Value must be an array')
    } else {
      params.values.map((el, index) => {
        if (typeof el != 'number') {
          throw new Error('Value must be a number, index=' + index)
        }
      })
    }
    return this.connectAndPerformOperation(async () =>
      this.performWriteOperation(
        params,
        this.client.writeRegisters.bind(this.client),
        'Write Multiple Registers'
      )
    )
  }
}

export default Modbus.getInstance()
