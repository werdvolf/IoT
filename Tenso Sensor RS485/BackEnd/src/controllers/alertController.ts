import { Request, Response } from 'express'
import AlertService, { AlertInput } from '../services/alertService'
import { handleRequestError } from '../Error/Error'

class AlertController {
  public async addAlert(req: Request, res: Response): Promise<void> {
    try {
      const alertInput: AlertInput = req.body
      const newAlert = await AlertService.addAlert(alertInput)
      res
        .status(201)
        .json({ message: 'Alert created successfully', alert: newAlert })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async getAlertById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      if (id) {
        const alert = await AlertService.getAlertById(parseInt(id, 10))

        if (alert) {
          res.status(200).json({
            message: `Return alert with id=${id}`,
            alert: alert,
          })
        } else {
          res.status(404).json({ error: `Alert not found with id=${id}` })
        }
      }
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async getAllAlerts(req: Request, res: Response): Promise<void> {
    try {
      const alerts = await AlertService.getAllAlerts()
      if (alerts) {
        res.status(200).json({
          message: 'Returned all alerts',
          alerts: alerts,
        })
      } else {
        res.status(404).json({ error: `There are no alerts` })
      }
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async deleteAlertById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (id) {
        await AlertService.deleteAlertById(parseInt(id, 10))

        res.status(200).json({
          message: `Deleted alert with ID ${id}`,
        })
      } else {
        res.status(404).json({ error: `Alert not found with id=${id}` })
      }
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }
}

export default new AlertController()
