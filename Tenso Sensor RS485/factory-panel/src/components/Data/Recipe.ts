import { HeadCell } from './HeadCell'

export interface Component {
  name: string
  amount: number
}

export interface RecipeData {
  id?: number
  name: string
  components: Component[]
}

export const headCellsRecipeData: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Назва Рецепту',
  },
  ...Array.from({ length: 12 }, (_, index) => ({
    disablePadding: true,
    id: `component${index + 1}`,
    label: `Компонент ${index + 1}`,
    numeric: true,
  })),
]
