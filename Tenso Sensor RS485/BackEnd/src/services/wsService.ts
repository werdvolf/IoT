import WebSocket from 'ws'

import ModbusFunctions from '../utils/modbusFunctions'

enum WSMessages {
  GetWeight = 'GetWeight',
}

class WebSocketService {
  static wss: WebSocket.Server

  constructor() {
    WebSocketService.wss = new WebSocket.Server({ port: 8080 })
    WebSocketService.wss.on('connection', WebSocketService.handleConnection)
  }

  static handleConnection(ws: WebSocket) {
    console.log('New client connected')

    ws.on('message', (rawMessage: string) => {
      const { message } = JSON.parse(rawMessage)

      if (message === WSMessages.GetWeight) {
        ModbusFunctions.getWeight().then(data => {
          WebSocketService.broadcast(JSON.stringify(data))
        })
      }
      console.log(`Received message: ${message}`)
      // WebSocketService.broadcast(`Server received your message: ${message}`)
    })

    ws.on('close', () => {
      console.log('Client disconnected')
    })
  }

  static broadcast(message: string) {
    WebSocketService.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  }
}

export default WebSocketService
