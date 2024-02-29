import { Request, Response } from 'express'
import ReceiptService, { ReceiptInput } from '../services/receiptService'
import { handleRequestError } from '../Error/Error'

class ReceiptController {
  public async addReceipt(req: Request, res: Response): Promise<void> {
    try {
      const receiptInput: ReceiptInput = req.body
      const newReceipt = await ReceiptService.addReceipt(receiptInput)

      res
        .status(201)
        .json({ message: 'Receipt created successfully', receipt: newReceipt })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async getReceiptById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      if (id) {
        const receipt = await ReceiptService.getReceiptById(parseInt(id, 10))
        if (receipt) {
          res.status(200).json({
            message: `Return receipt with id=${id}`,
            receipt: receipt,
          })
        } else {
          res.status(404).json({ error: `Alert not found with id=${id}` })
        }
      }
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async getAllReceipts(req: Request, res: Response): Promise<void> {
    try {
      const receipts = await ReceiptService.getAllReceipts()

      res.status(200).json({
        message: 'Returned all receipts',
        receipts: receipts,
      })
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }

  public async deleteReceiptById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      if (id) {
        await ReceiptService.deleteReceiptById(parseInt(id, 10))
        res.status(200).json({
          message: `Deleted receipt with ID ${id}`,
        })
      }
    } catch (error: any) {
      handleRequestError(error, res)
    }
  }
}

export default new ReceiptController()
