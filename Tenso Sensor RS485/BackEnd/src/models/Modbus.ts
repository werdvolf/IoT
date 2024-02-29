import sqlite3 from 'sqlite3'

class ModbusRequest {
  functionType: string
  returnedData?: any[] | null
  startExecutionTime: string
  status: string
  id?: number
  constructor(
    functionType: string,
    startExecutionTime: string,
    status: string,
    returnedData?: any[] | null,
    id?: number
  ) {
    this.functionType = functionType
    this.returnedData = returnedData
    this.startExecutionTime = startExecutionTime
    this.status = status
    this.id = id
  }
}

export async function saveModbusRequestToDatabase(
  modbusRequest: ModbusRequest
): Promise<void> {
  const db = new sqlite3.Database('database.db')

  const query =
    'INSERT INTO modbusRequests (functionType, startExecutionTime, returnedData, status) VALUES (?, ?, ?, ?)'
  const values = [
    modbusRequest.functionType,
    modbusRequest.startExecutionTime,
    JSON.stringify(modbusRequest.returnedData),
    modbusRequest.status,
  ]

  try {
    await new Promise<void>((resolve, reject) => {
      db.run(query, values, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  } catch (error) {
    console.error('Error saving to database:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function getAllModbusRequests(): Promise<ModbusRequest[] | null> {
  const db = new sqlite3.Database('database.db')
  const query = 'SELECT * FROM modbusRequests'
  try {
    return await new Promise<ModbusRequest[] | null>((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          const modbusRequests: ModbusRequest[] = rows.map((row: any) => {
            const returnedData = JSON.parse(row.returnedData)
            return new ModbusRequest(
              row.functionType,
              row.startExecutionTime,
              row.status,
              returnedData,
              row.id
            )
          })
          resolve(modbusRequests)
        }
      })
    })
  } catch (error) {
    console.error('Error getting all modbusReports from database:', error)
    throw error
  } finally {
    db.close()
  }
}

export default ModbusRequest

// const db = new sqlite3.Database('database.db')

// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS modbusRequests (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     functionType TEXT NOT NULL,
//     returnedData TEXT,
//     startExecutionTime TEXT NOT NULL,
//     status TEXT NOT NULL
//   );
// `

// db.run(createTableQuery, err => {
//   if (err) {
//     console.error('Error creating modbusRequests table:', err)
//   } else {
//     console.log('ModbusRequests table created successfully.')
//   }

//   db.close()
// })
