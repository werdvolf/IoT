import { HeadCell } from './HeadCell'

export interface ReportData {
  id: number
  receiptId: number
  startTime: string
  endTime: string
}

export const headCellsReportData: readonly HeadCell[] = [
  {
    id: 'receiptId',
    numeric: true,
    disablePadding: true,
    label: 'Айді рецепту',
  },
  {
    id: 'startTime',
    numeric: false,
    disablePadding: false,
    label: 'Початок виконання',
  },
  {
    id: 'endTime',
    numeric: false,
    disablePadding: false,
    label: 'Закінчення виконання',
  },
]
