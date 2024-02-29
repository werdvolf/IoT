import { useState, useEffect } from 'react'

import CustomTable from '../../UI/Table/Table'
import './Analytic.css'

import { headCellsReportData } from '../../Data/Report.ts'
import ApiService from '../../../services/apiService.ts'

const Analytic = () => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    ApiService.getRequest('report/getAllReports')
      .then(responseData => {
        setReportData(responseData.receipts)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <CustomTable
      title="Аналітика"
      headCells={headCellsReportData}
      rows={reportData}
    ></CustomTable>
  )
}

export default Analytic
