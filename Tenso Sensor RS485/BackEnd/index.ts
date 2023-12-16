import {
  ModbusFunctions,
  ModbusConnectionSettings,
  ModbusRequestParameters,
  ModbusWriteParameters,
} from './modbusFunctions'

const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())

const connectionSettings: ModbusConnectionSettings = {
  port: 'COM6',
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
}

const modbusFunctions = new ModbusFunctions()

app.post('/modbusRead', async (req, res) => {
  try {
    const { readFunction, nodeIdsRead, addressRead, quantityRead } = req.body
    let modbusData: any
    let requestParameters: ModbusRequestParameters
    console.log('Received request:', req.body)
    if (nodeIdsRead == '' || addressRead == '' || quantityRead == '') {
      return
    } else {
      requestParameters = {
        nodeIds: [+nodeIdsRead],
        address: +addressRead,
        quantity: +quantityRead,
      }
    }
    // Perform the Modbus function based on the provided type
    switch (readFunction) {
      case 'readHoldingRegisters':
        modbusData = await modbusFunctions.readHoldingRegisters(
          requestParameters,
          connectionSettings,
        )
        break
      case 'readCoils':
        modbusData = await modbusFunctions.readCoils(
          requestParameters,
          connectionSettings,
        )
        break
      case 'readInputRegisters':
        modbusData = await modbusFunctions.readCoils(
          requestParameters,
          connectionSettings,
        )
        break
      case 'readDiscreteInputs':
        modbusData = await modbusFunctions.readCoils(
          requestParameters,
          connectionSettings,
        )
        break
      default:
        throw new Error('Invalid Modbus function type')
    }

    res.json({
      success: true,
      message: 'Modbus operation completed successfully',
      data: modbusData,
    })
  } catch (error) {
    // Handle errors and send an error response
    console.log('Error: ', error)
    res.status(500).json({ success: false, message: `Error: ${error}` })
  }
})

app.post('/modbusWrite', async (req, res) => {
  try {
    const { writeFunction, nodeIdsWrite, addressWrite, valuesWrite } = req.body
    const valuesArray = valuesWrite.split(',')
    console.log(valuesArray)
    let modbusData: any
    let requestParameters: ModbusWriteParameters

    if (nodeIdsWrite == '' || addressWrite == '' || valuesWrite == '') {
      return
    } else {
      requestParameters = {
        nodeIds: [+nodeIdsWrite],
        address: +addressWrite,
        values: valuesArray,
      }
    }
    // Perform the Modbus function based on the provided type
    switch (writeFunction) {
      case 'writeSingleCoil':
        modbusData = await modbusFunctions.writeSingleCoil(
          requestParameters,
          connectionSettings,
        )
        break
      case 'writeSingleRegister':
        modbusData = await modbusFunctions.writeMultipleRegisters(
          requestParameters,
          connectionSettings,
        )
      case 'writeMultipleRegisters':
        modbusData = await modbusFunctions.writeMultipleRegisters(
          requestParameters,
          connectionSettings,
        )
        break
      default:
        throw new Error('Invalid Modbus function type')
    }

    res.json({
      success: true,
      message: 'Modbus operation completed successfully',
      data: modbusData,
    })
  } catch (error) {
    // Handle errors and send an error response
    console.log('Error: ', error)
    res.status(500).json({ success: false, message: `Error: ${error}` })
  }
})

const port = 8080
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
