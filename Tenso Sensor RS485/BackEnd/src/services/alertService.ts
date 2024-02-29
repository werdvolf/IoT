import Alert, {
  saveAlertToDatabase,
  getAlertById,
  getAllAlerts,
  deleteAlertById,
} from '../models/Alert'

export interface AlertInput {
  title: string
  alertLevel: number
}

class AlertService {
  public async addAlert(alertInput: AlertInput): Promise<Alert> {
    const { title, alertLevel } = alertInput
    const startTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const newAlert = new Alert(title, startTime, alertLevel)
    await saveAlertToDatabase(newAlert)
    return newAlert
  }
  public async getAlertById(id: number): Promise<Alert | null> {
    return await getAlertById(id)
  }

  public async getAllAlerts(): Promise<Alert[]> {
    return await getAllAlerts()
  }
  public async deleteAlertById(id: number): Promise<void> {
    return await deleteAlertById(id)
  }
}

export default new AlertService()
