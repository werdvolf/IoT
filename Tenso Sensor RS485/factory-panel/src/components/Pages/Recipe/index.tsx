import { useState, useEffect, useCallback } from 'react'
import CustomTable from '../../UI/Table/Table.tsx'

import { headCellsRecipeData, RecipeData } from '../../Data/Recipe.ts'
import ApiService from '../../../services/apiService.ts'

import { RecipeModal, TModalType } from './Components/RecipeModal/index.tsx'
import { useForm } from 'react-hook-form'
import { Row } from '../../Data/TableRows.ts'

const Recipe = () => {
  const [receiptData, setReceiptData] = useState([])
  const [modalType, setModalType] = useState<TModalType>(null)

  const methods = useForm<RecipeData>({ defaultValues: {} })

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

  const createOrEditRecipe = useCallback(
    async (recipe: RecipeData) => {
      try {
        if (modalType === 'create') {
          await ApiService.postRequest('receipt/addReceipt', recipe)
        } else {
          // change by your own
          await ApiService.postRequest('receipt/editReceipt', recipe)
        }

        handleModalClose()

        fetchReceipts()
      } catch (error) {
        console.error('Error creating recipe:', error)
      }
    },
    [modalType],
  )

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
    <>
      <CustomTable
        title="Рецепти"
        headCells={headCellsRecipeData}
        rows={transformedData}
        addRowAction={handleAddAction}
        editRowAction={handleEditAction}
        deleteRowAction={id => console.log(id)}
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
