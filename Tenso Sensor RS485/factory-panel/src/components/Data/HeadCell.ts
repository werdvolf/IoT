import { AlertData } from './Alert.ts'
import { ReportData } from './Report.ts'
import { RecipeData } from './Recipe.ts'

export interface HeadCell {
  disablePadding: boolean
  id: keyof AlertData | keyof ReportData | string
  label: string
  numeric: boolean
}
