import Recipe, {
  saveRecipeToDatabase,
  updateRecipe,
  getRecipeById,
  getAllRecipes,
  deleteRecipeById,
  Component,
} from '../models/Recipe'

import {
  ValidationError,
  DatabaseError,
  ServiceException,
} from '../Error/Error'

export interface RecipeInput {
  id?: number
  name: string
  components: Component[]
}

class RecipeService {
  public async addRecipe(recipeInput: RecipeInput): Promise<Recipe> {
    try {
      // Simulate validation error
      if (!recipeInput.name || !recipeInput.components) {
        throw new ValidationError('Invalid recipe input')
      }
      if (recipeInput.components.length < 12) {
        throw new ValidationError('Recipe must contain 12 components')
      }
      // Actual data processing
      const newRecipe = new Recipe(recipeInput.name, recipeInput.components)
      await saveRecipeToDatabase(newRecipe)

      return newRecipe
    } catch (error) {
      // Service-level error handling
      if (error instanceof ValidationError) {
        // Log validation error or handle as needed
        console.error('Validation error:', error.message)
        throw error
      } else if (error instanceof DatabaseError) {
        // Log detailed error information, handle retries, etc.
        console.error('Database error:', error.message)
        throw new ServiceException('Error processing recipe data')
      } else {
        // Re-throw other types of errors
        throw error
      }
    }
  }
  public async updateRecipe(recipeInput: RecipeInput): Promise<Recipe> {
    try {
      // Simulate validation error
      if (!recipeInput.name || !recipeInput.components || !recipeInput.id) {
        throw new ValidationError('Invalid recipe input')
      }
      if (recipeInput.components.length < 12) {
        throw new ValidationError('Recipe must contain 12 components')
      }
      // Actual data processing
      const newRecipe = new Recipe(
        recipeInput.name,
        recipeInput.components,
        recipeInput.id
      )
      await updateRecipe(newRecipe)

      return newRecipe
    } catch (error) {
      // Service-level error handling
      if (error instanceof ValidationError) {
        // Log validation error or handle as needed
        console.error('Validation error:', error.message)
        throw error
      } else if (error instanceof DatabaseError) {
        // Log detailed error information, handle retries, etc.
        console.error('Database error:', error.message)
        throw new ServiceException('Error processing recipe data')
      } else {
        // Re-throw other types of errors
        throw error
      }
    }
  }

  public async getRecipeById(id: number): Promise<Recipe | null> {
    return await getRecipeById(id)
  }

  public async getAllRecipes(): Promise<Recipe[]> {
    return await getAllRecipes()
  }

  public async deleteRecipeById(id: number): Promise<void> {
    return await deleteRecipeById(id)
  }
}

export default new RecipeService()
