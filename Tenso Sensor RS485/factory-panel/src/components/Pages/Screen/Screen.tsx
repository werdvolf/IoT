import { useEffect, useState } from 'react'
import './Screen.css'
import WebSocketService from '../../../services/wsService'

const wsService = WebSocketService.getInstance()

enum ModbusFunctions {
  GetWeight = 'GetWeight',
}

interface WebSocketResponse {
  functionName: string
  returnedData: number
}

const Screen = () => {
  const [receivedData, setReceivedData] = useState<WebSocketResponse | null>(
    null,
  )

  const handleReceivedData = (data: string) => {
    const parsedData: WebSocketResponse = JSON.parse(data)
    setReceivedData(parsedData)
    // Process the received data as needed
  }

  const sendWebSocketMessage = () => {
    wsService.setMessageCallback(handleReceivedData)
    wsService.sendMessage(
      JSON.stringify({ message: ModbusFunctions.GetWeight }),
    )
  }

  // Set up interval to send WebSocket message every 500 milliseconds
  useEffect(() => {
    const intervalId = setInterval(sendWebSocketMessage, 200)

    // Cleanup: Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId)
    }
  }, []) // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <h2>Екран</h2>
      {receivedData && <p>ВАГА - {receivedData.returnedData}</p>}
    </div>
  )
}

export default Screen
