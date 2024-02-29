class WebSocketService {
  private static instance: WebSocketService
  private ws: WebSocket
  private messageCallback: ((data: string) => void) | null = null

  private constructor() {
    // Check if WebSocket is supported in the browser
    if (typeof WebSocket !== 'undefined') {
      // Initialize WebSocket connection
      this.ws = new WebSocket('ws://localhost:8080')

      // Set up event listeners

      this.ws.addEventListener('open', () => {
        console.log('WebSocket connection opened')
      })

      this.ws.addEventListener('message', event => {
        console.log('Received message:', event.data)
        if (this.messageCallback) {
          this.messageCallback(event.data)
        }
      })

      this.ws.addEventListener('close', () => {
        console.log('WebSocket connection closed')
      })

      this.ws.addEventListener('error', error => {
        console.error('WebSocket error:', error)
      })
    } else {
      throw new Error('WebSocket is not supported in this browser')
    }
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  public sendMessage(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message)
    } else {
      console.warn('WebSocket not open. Message not sent:', message)
    }
  }

  public setMessageCallback(callback: (data: string) => void): void {
    this.messageCallback = callback
  }
}

export default WebSocketService
