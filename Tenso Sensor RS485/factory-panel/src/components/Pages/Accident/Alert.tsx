import './Alert.css'
import { useState, useEffect } from 'react'

import CustomTable from '../../UI/Table/Table.tsx'
import { headCellsAlertData } from '../../Data/Alert.ts'

import ApiService from '../../../services/apiService.ts'

const Accident = () => {
  const [accidentData, setAccidentData] = useState([])

  useEffect(() => {
    ApiService.getRequest('alert/getAllAlerts')
      .then(responseData => {
        setAccidentData(responseData.alerts)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <CustomTable
      title="Аварії"
      headCells={headCellsAlertData}
      rows={accidentData}
    ></CustomTable>
  )
}

export default Accident
