import sqlite3 from 'sqlite3'

export interface Component {
  name: string
  amount: number
}

class Receipt {
  name: string
  components: Component[]
  id?: number
  constructor(name: string, components: Component[], id?: number) {
    this.name = name
    this.components = components
    this.id = id
  }
}

export async function saveReceiptToDatabase(receipt: Receipt): Promise<void> {
  const db = new sqlite3.Database('database.db')

  const query = 'INSERT INTO receipts (name, components) VALUES (?, ?)'
  const values = [receipt.name, JSON.stringify(receipt.components)]

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

export async function getReceiptById(id: number): Promise<Receipt | null> {
  const db = new sqlite3.Database('database.db')

  const query = 'SELECT * FROM receipts WHERE id = ?'
  const values = [id]

  try {
    return await new Promise<Receipt | null>((resolve, reject) => {
      db.get(
        query,
        values,
        (
          err,
          row: {
            id: number
            name: string
            components: string
          }
        ) => {
          if (err) {
            reject(err)
          } else if (!row) {
            resolve(null) // No matching receipt found
          } else {
            const receipt = new Receipt(
              row.name,
              JSON.parse(row.components),
              row.id
            )
            resolve(receipt)
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

export async function getAllReceipts(): Promise<Receipt[]> {
  const db = new sqlite3.Database('database.db')

  const query = 'SELECT * FROM receipts'

  try {
    return await new Promise<Receipt[]>((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          const receipts: Receipt[] = rows.map((row: any) => {
            return new Receipt(row.name, JSON.parse(row.components), row.id)
          })
          resolve(receipts)
        }
      })
    })
  } catch (error) {
    console.error('Error getting all receipts from database:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function deleteReceiptById(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('database.db')

    const query = 'DELETE FROM receipts WHERE id = ?'

    db.run(query, [id], function (err) {
      db.close()

      if (err) {
        reject(err)
      } else {
        // Check if any row was affected
        if (this.changes > 0) {
          resolve()
        } else {
          reject(new Error(`No receipt found with ID ${id}`))
        }
      }
    })
  })
}

export default Receipt

// import sqlite3 from 'sqlite3'

// const db = new sqlite3.Database('database.db')

// const createTableQuery = `
// CREATE TABLE  IF NOT EXISTS receipts (
//   id INTEGER PRIMARY KEY,
//   name TEXT NOT NULL,
//   components TEXT NOT NULL
// );
// `

// db.run(createTableQuery, err => {
//   if (err) {
//     console.error('Error creating receipts table:', err)
//   } else {
//     console.log('Receipts table created successfully.')
//   }

//   db.close()
// })
