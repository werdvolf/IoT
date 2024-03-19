import { headCellsRecipeData, RecipeData } from '../../../../Data/Recipe'
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import CustomButton from '../../../../UI/CustomButton/CustomButton'
import { RecipeCard } from './RecipeCard'
import CustomModal from '../../../../UI/Modal/CustomModal'

export type TModalType = 'create' | 'edit' | null

interface ModalProps {
  modalType: TModalType
  formMethods: UseFormReturn<RecipeData, any, RecipeData>
  createOrEditRecipe: (recipe: RecipeData) => Promise<void>
  onClose: () => void
}

export const RecipeModal: React.FC<ModalProps> = ({
  modalType,
  formMethods,
  createOrEditRecipe,
  onClose,
}) => {
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
  }

  return (
    <CustomModal isOpen={!!modalType} handleClose={onClose} title="Редагувати">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FormProvider {...formMethods}>
          <RecipeCard rows={headCellsRecipeData} />
          <CustomButton
            buttonText="Створити Рецепт"
            sx={{ margin: '20px auto 0' }}
            type="submit"
            onClick={formMethods.handleSubmit(onSave)}
          />
        </FormProvider>
      </div>
    </CustomModal>
  )
}
