import sqlite3 from 'sqlite3'

export interface Component {
  name: string
  amount: number
}

class Recipe {
  name: string
  components: Component[]
  id?: number
  constructor(name: string, components: Component[], id?: number) {
    this.name = name
    this.components = components
    this.id = id
  }
}

export async function saveRecipeToDatabase(recipe: Recipe): Promise<void> {
  const db = new sqlite3.Database('database.db')

  const query = 'INSERT INTO recipes (name, components) VALUES (?, ?)'
  const values = [recipe.name, JSON.stringify(recipe.components)]

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

export async function updateRecipe(recipe: Recipe): Promise<void> {
  const db = new sqlite3.Database('database.db')
  const query = 'UPDATE recipes SET name = ?, components = ? WHERE id = ?'
  const values = [recipe.name, JSON.stringify(recipe.components), recipe.id]

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
    console.error('Error updating recipe:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function getRecipeById(id: number): Promise<Recipe | null> {
  const db = new sqlite3.Database('database.db')

  const query = 'SELECT * FROM recipes WHERE id = ?'
  const values = [id]

  try {
    return await new Promise<Recipe | null>((resolve, reject) => {
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
            resolve(null)
          } else {
            const recipe = new Recipe(
              row.name,
              JSON.parse(row.components),
              row.id
            )
            resolve(recipe)
          }
        }
      )
    })
  } catch (error) {
    console.error('Error getting recipe by ID from database:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const db = new sqlite3.Database('database.db')

  const query = 'SELECT * FROM recipes'

  try {
    return await new Promise<Recipe[]>((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          const recipes: Recipe[] = rows.map((row: any) => {
            return new Recipe(row.name, JSON.parse(row.components), row.id)
          })
          resolve(recipes)
        }
      })
    })
  } catch (error) {
    console.error('Error getting all recipes from database:', error)
    throw error
  } finally {
    db.close()
  }
}

export async function deleteRecipeById(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('database.db')

    const query = 'DELETE FROM recipes WHERE id = ?'

    db.run(query, [id], function (err) {
      db.close()

      if (err) {
        reject(err)
      } else {
        // Check if any row was affected
        if (this.changes > 0) {
          resolve()
        } else {
          reject(new Error(`No recipe found with ID ${id}`))
        }
      }
    })
  })
}

export default Recipe

// import sqlite3 from 'sqlite3'

// const db = new sqlite3.Database('database.db')

// const createTableQuery = `
// CREATE TABLE  IF NOT EXISTS recipes (
//   id INTEGER PRIMARY KEY,
//   name TEXT NOT NULL,
//   components TEXT NOT NULL
// );
// `

// db.run(createTableQuery, err => {
//   if (err) {
//     console.error('Error creating recipes table:', err)
//   } else {
//     console.log('Recipes table created successfully.')
//   }

//   db.close()
// })
