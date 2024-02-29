import Receipt, {
  saveReceiptToDatabase,
  getReceiptById,
  getAllReceipts,
  deleteReceiptById,
  Component,
} from '../models/Receipt'

import {
  ValidationError,
  DatabaseError,
  ServiceException,
} from '../Error/Error'

export interface ReceiptInput {
  name: string
  components: Component[]
}

class ReceiptService {
  public async addReceipt(receiptInput: ReceiptInput): Promise<Receipt> {
    try {
      // Simulate validation error
      if (!receiptInput.name || !receiptInput.components) {
        throw new ValidationError('Invalid receipt input')
      }
      if (receiptInput.components.length < 12) {
        throw new ValidationError('Receipt must contain 12 components')
      }
      // Actual data processing
      const newReceipt = new Receipt(receiptInput.name, receiptInput.components)
      await saveReceiptToDatabase(newReceipt)

      return newReceipt
    } catch (error) {
      // Service-level error handling
      if (error instanceof ValidationError) {
        // Log validation error or handle as needed
        console.error('Validation error:', error.message)
        throw error
      } else if (error instanceof DatabaseError) {
        // Log detailed error information, handle retries, etc.
        console.error('Database error:', error.message)
        throw new ServiceException('Error processing receipt data')
      } else {
        // Re-throw other types of errors
        throw error
      }
    }
  }

  public async getReceiptById(id: number): Promise<Receipt | null> {
    return await getReceiptById(id)
  }

  public async getAllReceipts(): Promise<Receipt[]> {
    return await getAllReceipts()
  }

  public async deleteReceiptById(id: number): Promise<void> {
    return await deleteReceiptById(id)
  }
}

export default new ReceiptService()
