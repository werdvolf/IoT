import express from 'express'
import cors from 'cors'
import {
  ModbusFunctions,
  ModbusConnectionSettings,
  ModbusRequestParameters,
  ModbusWriteParameters,
} from './modbusFunctions'

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
    try {
      modbusData = await modbusFunctions[readFunction](
        requestParameters,
        connectionSettings,
      )
    } catch (error) {
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
    try {
      modbusData = await modbusFunctions[writeFunction](
        requestParameters,
        connectionSettings,
      )
    } catch (error) {
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
