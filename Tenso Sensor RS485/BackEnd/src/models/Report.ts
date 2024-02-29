import sqlite3 from 'sqlite3'

class Report {
  receiptId: number
  startTime: string
  endTime?: string
  id?: number
  constructor(
    receiptId: number,
    startTime: string,
    endTime?: string,
    id?: number
  ) {
    this.receiptId = receiptId
    this.startTime = startTime
    this.endTime = endTime
    this.id = id
  }
}

export async function saveReportToDatabase(report: Report): Promise<void> {
  const db = new sqlite3.Database('database.db')

  const query = 'INSERT INTO reports (receiptId, startTime) VALUES (?, ?)'
  const values = [report.receiptId, report.startTime]

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
    console.error('Error saving alert to database:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function getReportById(id: number): Promise<Report | null> {
  const db = new sqlite3.Database('database.db')

  const query = 'SELECT * FROM reports WHERE id = ?'
  const values = [id]

  try {
    return await new Promise<Report | null>((resolve, reject) => {
      db.get(
        query,
        values,
        (
          err,
          row: {
            receiptId: number
            startTime: string
            endTime: string
            id: number
          }
        ) => {
          if (err) {
            reject(err)
          } else if (!row) {
            resolve(null) // No matching report found
          } else {
            const report = new Report(
              row.receiptId,
              row.startTime,
              row.endTime,
              row.id
            )
            resolve(report)
          }
        }
      )
    })
  } catch (error) {
    console.error('Error getting receipt by ID from database:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function getAllReports(): Promise<Report[]> {
  const db = new sqlite3.Database('database.db')

  const query = 'SELECT * FROM reports'

  try {
    return await new Promise<Report[]>((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          const receipts: Report[] = rows.map((row: any) => {
            return new Report(row.receiptId, row.startTime, row.endTime, row.id)
          })
          resolve(receipts)
        }
      })
    })
  } catch (error) {
    console.error('Error getting all reports from database:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function deleteReportById(id: number): Promise<void> {
  const db = new sqlite3.Database('database.db')

  const query = 'DELETE FROM reports WHERE id = ?'

  try {
    return await new Promise<void>((resolve, reject) => {
      db.run(query, [id], function (err) {
        db.close()

        if (err) {
          reject(err)
        } else {
          // Check if any row was affected
          if (this.changes > 0) {
            resolve()
          } else {
            reject(new Error(`No reports found with ID ${id}`))
          }
        }
      })
    })
  } catch (error) {
    console.error('Error during deleting report from database:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function setReportEndTimeById(
  id: number,
  endTime: string
): Promise<void> {
  const db = new sqlite3.Database('database.db')

  const query =
    'UPDATE reports SET endTime = ? WHERE id = ? AND endTime IS NULL'
  const values = [endTime, id]
  try {
    return await new Promise<void>((resolve, reject) => {
      db.run(query, values, function (err) {
        if (err) {
          reject(err)
        } else {
          // Check if any row was affected
          if (this.changes > 0) {
            resolve()
          } else {
            reject(
              new Error(`No report found with ID ${id} or endTime is setted`)
            )
          }
        }
      })
    })
  } catch (error) {
    console.error('Error during updating endTime field:', error)
    throw error
  } finally {
    db.close()
  }
}

export default Report

// const db = new sqlite3.Database('database.db')

// const createReportsTableQuery = `
//   CREATE TABLE IF NOT EXISTS reports (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     receiptId INTEGER,
//     startTime TEXT NOT NULL,
//     endTime,
//     FOREIGN KEY (receiptId) REFERENCES receipts(id)
//   );
// `

// // Enable foreign key constraints
// const enableForeignKeyQuery = 'PRAGMA foreign_keys = ON;'

// db.serialize(() => {
//   db.run(createReportsTableQuery, err => {
//     if (err) {
//       console.error('Error creating reports table:', err)
//     } else {
//       console.log('Reports table created successfully.')
//     }
//   })

//   db.run(enableForeignKeyQuery, err => {
//     if (err) {
//       console.error('Error enabling foreign key constraints:', err)
//     } else {
//       console.log('Foreign key constraints enabled.')
//     }

//     db.close()
//   })
// })
