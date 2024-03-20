import { useState, useEffect, useCallback } from 'react'
import CustomTable from '../../UI/Table/Table.tsx'

import { headCellsRecipeData, RecipeData } from '../../Data/Recipe.ts'
import ApiService from '../../../services/apiService.ts'

import { RecipeModal, TModalType } from './Components/RecipeModal/index.tsx'
import { useForm } from 'react-hook-form'
import { Row } from '../../Data/TableRows.ts'

const Recipe = () => {
  const [recipeData, setRecipeData] = useState([])
  const [modalType, setModalType] = useState<TModalType>(null)

  const methods = useForm<RecipeData>({ defaultValues: {} })

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      const responseData = await ApiService.getRequest('recipe/getAllRecipes')
      setRecipeData(responseData.recipes)
    } catch (err) {
      console.log(err)
    }
  }

  const handleModalClose = () => {
    setModalType(null)
    // need to debug
    // if no add this call to handleAddAction before setModalType
    methods.reset({})
  }

  const handleEditAction = (row: Row) => {
    methods.reset(row as RecipeData)
    setModalType('edit')
  }

  const handleAddAction = () => {
    methods.reset({})
    setModalType('create')
  }

  const handleDeleteAction = useCallback(async (row: Row) => {
    try {
      await ApiService.deleteRequest('recipe/deleteRecipeById/' + row.id)
      fetchRecipes()
    } catch (error) {
      console.error('Error deleting recipe:', error)
    }
  }, [])

  const createOrEditRecipe = useCallback(
    async (recipe: RecipeData) => {
      try {
        if (modalType === 'create') {
          await ApiService.postRequest('recipe/addRecipe', recipe)
        } else {
          // change by your own
          console.log(recipe)

          await ApiService.postRequest('recipe/updateRecipe', recipe)
        }

        handleModalClose()

        fetchRecipes()
      } catch (error) {
        console.error('Error creating recipe:', error)
      }
    },
    [modalType],
  )

  // Function to transform the recipe data for rendering
  const transformRecipeDataForTable = (data: RecipeData[]): any[] => {
    return data.map(recipe => {
      const transformedRecipe: any = {
        id: recipe.id,
        name: recipe.name,
      }
      recipe.components.forEach((component, index) => {
        transformedRecipe[`component${index + 1}`] = component.amount
      })
      return transformedRecipe
    })
  }

  const transformedData = transformRecipeDataForTable(recipeData)

  return (
    <>
      <CustomTable
        title="Рецепти"
        headCells={headCellsRecipeData}
        rows={transformedData}
        addRowAction={handleAddAction}
        editRowAction={handleEditAction}
        deleteRowAction={handleDeleteAction}
      />
      <RecipeModal
        formMethods={methods}
        modalType={modalType}
        createOrEditRecipe={createOrEditRecipe}
        onClose={handleModalClose}
      />
    </>
  )
}

export default Recipe
