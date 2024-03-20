import { Router } from 'express'
import RecipeController from '../controllers/recipeController'

const router = Router()

router.post('/addRecipe', RecipeController.addRecipe)
router.post('/updateRecipe', RecipeController.updateRecipe)
router.get('/getRecipeById/:id', RecipeController.getRecipeById)
router.get('/getAllRecipes', RecipeController.getAllRecipes)
router.delete('/deleteRecipeById/:id', RecipeController.deleteRecipeById)

export default router
