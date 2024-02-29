import { useState, useEffect, useCallback } from 'react'
import CustomTable from '../../UI/Table/Table'

import { headCellsRecipeData, RecipeData } from '../../Data/Recipe.ts'
import ApiService from '../../../services/apiService.ts'

import RecipeModal from './Components/RecipeModal'
import CustomButton from '../../UI/CustomButton/CustomButton.tsx'

const Recipe = () => {
  const [receiptData, setReceiptData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchReceipts()
  }, [])

  const fetchReceipts = async () => {
    try {
      const responseData = await ApiService.getRequest('receipt/getAllReceipts')
      setReceiptData(responseData.receipts)
    } catch (err) {
      console.log(err)
    }
  }

  const createRecipe = useCallback(async (recipe: RecipeData) => {
    try {
      await ApiService.postRequest('receipt/addReceipt', recipe)

      fetchReceipts()

      setIsModalOpen(false)
    } catch (error) {
      console.error('Error creating recipe:', error)
    }
  }, [])

  // Function to transform the receipt data for rendering
  const transformReceiptDataForTable = (data: RecipeData[]): any[] => {
    return data.map(receipt => {
      const transformedReceipt: any = {
        id: receipt.id,
        name: receipt.name,
      }
      receipt.components.forEach((component, index) => {
        transformedReceipt[`component${index + 1}`] = component.amount
      })
      return transformedReceipt
    })
  }

  const transformedData = transformReceiptDataForTable(receiptData)

  return (
    <CustomTable
      title="Рецепти"
      headCells={headCellsRecipeData}
      rows={transformedData}
      addRowModal={
        <RecipeModal
          createOrEditRecipe={createRecipe}
          onClose={() => setIsModalOpen(false)}
        />
      }
      editRowModal={
        <RecipeModal
          createOrEditRecipe={createRecipe}
          onClose={() => setIsModalOpen(false)}
        />
      }
      deleteRowAction={id => console.log(id)}
    ></CustomTable>
  )
}

export default Recipe
