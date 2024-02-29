import { headCellsRecipeData, RecipeData } from '../../../../Data/Recipe'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import CustomButton from '../../../../UI/CustomButton/CustomButton'
import RecipeCard from './RecipeCard'

interface ModalProps {
  createOrEditRecipe: (recipe: RecipeData) => Promise<void>
  onClose: () => void
  recipeData?: RecipeData
}

const RecipeModal: React.FC<ModalProps> = ({
  createOrEditRecipe,
  onClose,
  recipeData,
}) => {
  const methods = useForm<RecipeData>({ defaultValues: recipeData || {} })

  const { handleSubmit } = methods

  const onSave: SubmitHandler<RecipeData> = data => {
    // Extract numerical values from the data
    const numericalValues = Object.keys(data).reduce(
      (acc, key) => {
        if (key !== 'name' && key !== 'components') {
          const value = parseFloat(data[key as keyof RecipeData] as string)

          if (!isNaN(value)) {
            acc.push({ name: key, amount: value })
          }
        }

        return acc
      },
      [] as { name: string; amount: number }[],
    )

    // Create the final formatted data object
    const formattedData: RecipeData = {
      name: data.name,
      components: numericalValues,
    }

    // Call createRecipe with the formatted data
    createOrEditRecipe(formattedData)
    onClose()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <FormProvider {...methods}>
        <RecipeCard rows={headCellsRecipeData} />
        <CustomButton
          buttonText="Створити Рецепт"
          sx={{ margin: '20px auto 0' }}
          type="submit"
          onClick={handleSubmit(onSave)}
        />
      </FormProvider>
    </div>
  )
}

export default RecipeModal
