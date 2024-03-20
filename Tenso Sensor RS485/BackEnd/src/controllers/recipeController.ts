import { Request, Response } from 'express'
import RecipeService, { RecipeInput } from '../services/recipeService'
import { handleRequestError } from '../Error/Error'

class RecipeController {
  public async addRecipe(req: Request, res: Response): Promise<void> {
    try {
      const recipeInput: RecipeInput = req.body
      const newRecipe = await RecipeService.addRecipe(recipeInput)

      res
        .status(201)
        .json({ message: 'Recipe created successfully', recipe: newRecipe })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async updateRecipe(req: Request, res: Response): Promise<void> {
    try {
      const recipeInput: RecipeInput = req.body
      const newRecipe = await RecipeService.updateRecipe(recipeInput)

      res
        .status(201)
        .json({ message: 'Recipe updated successfully', recipe: newRecipe })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async getRecipeById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      if (id) {
        const recipe = await RecipeService.getRecipeById(parseInt(id, 10))
        if (recipe) {
          res.status(200).json({
            message: `Return recipe with id=${id}`,
            recipe: recipe,
          })
        } else {
          res.status(404).json({ error: `Recipe not found with id=${id}` })
        }
      }
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async getAllRecipes(req: Request, res: Response): Promise<void> {
    try {
      const recipes = await RecipeService.getAllRecipes()

      res.status(200).json({
        message: 'Returned all recipes',
        recipes: recipes,
      })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async deleteRecipeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (id) {
        await RecipeService.deleteRecipeById(parseInt(id, 10))
        res.status(200).json({
          message: `Deleted recipe with ID ${id}`,
        })
      }
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }
}

export default new RecipeController()
