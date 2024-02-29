import { HeadCell } from './HeadCell'

export interface AlertData {
  id: number
  alertLevel: number
  startTime: string
  title: string
}

export const headCellsAlertData: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Заголовок',
  },
  {
    id: 'startTime',
    numeric: false,
    disablePadding: false,
    label: 'Час виникання',
  },
  {
    id: 'alertLevel',
    numeric: true,
    disablePadding: false,
    label: 'Рівень',
  },
]
