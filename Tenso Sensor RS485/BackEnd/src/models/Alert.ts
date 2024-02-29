import sqlite3 from 'sqlite3'

class Alert {
  title: string
  startTime: string
  alertLevel: number
  id?: number

  constructor(
    title: string,
    startTime: string,
    alertLevel: number,
    id?: number
  ) {
    this.title = title
    this.startTime = startTime
    this.alertLevel = alertLevel
    this.id = id
  }
}

export async function saveAlertToDatabase(alert: Alert): Promise<void> {
  const db = new sqlite3.Database('database.db')

  const query =
    'INSERT INTO alerts (title, startTime, alertLevel) VALUES (?, ?, ?)'
  const values = [alert.title, alert.startTime, alert.alertLevel]

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

export async function getAlertById(id: number): Promise<Alert | null> {
  const db = new sqlite3.Database('database.db')

  const query = 'SELECT * FROM alerts WHERE id = ?'
  const values = [id]

  try {
    return await new Promise<Alert | null>((resolve, reject) => {
      db.get(
        query,
        values,
        (
          err,
          row: {
            id: number
            title: string
            startTime: string
            alertLevel: number
          }
        ) => {
          if (err) {
            reject(err)
          } else if (!row) {
            resolve(null) // No matching alert found
          } else {
            const alert = new Alert(
              row.title,
              row.startTime,
              row.alertLevel,
              row.id
            )
            resolve(alert)
          }
        }
      )
    })
  } catch (error) {
    console.error('Error getting alert by ID from database:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function getAllAlerts(): Promise<Alert[]> {
  const db = new sqlite3.Database('database.db')

  const query = 'SELECT * FROM alerts'

  try {
    return await new Promise<Alert[]>((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          const alerts: Alert[] = rows.map((row: any) => {
            return new Alert(row.title, row.startTime, row.alertLevel, row.id)
          })
          resolve(alerts)
        }
      })
    })
  } catch (error) {
    console.error('Error getting all alerts from database:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function deleteAlertById(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('database.db')

    const query = 'DELETE FROM alerts WHERE id = ?'

    db.run(query, [id], function (err) {
      db.close()

      if (err) {
        reject(err)
      } else {
        // Check if any row was affected
        if (this.changes > 0) {
          resolve()
        } else {
          reject(new Error(`No alert found with ID ${id}`))
        }
      }
    })
  })
}

export default Alert

// const db = new sqlite3.Database('database.db')

// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS alerts (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT NOT NULL,
//     startTime DATETIME NOT NULL,
//     alertLevel INTEGER NOT NULL
//   );
// `

// db.run(createTableQuery, err => {
//   if (err) {
//     console.error('Error creating receipts table:', err)
//   } else {
//     console.log('Receipts table created successfully.')
//   }

//   db.close()
// })
