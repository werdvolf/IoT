import axios, { AxiosResponse } from 'axios'

const baseUrl = 'http://localhost:3000/'

class ApiService {
  static async getRequest(
    url: string,
    headers?: Record<string, string>,
  ): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(baseUrl + url, {
        headers,
      })
      return response.data
    } catch (error) {
      handleApiError(error)
      throw error // Re-throw the error after handling
    }
  }

  static async postRequest(
    url: string,
    body: object,
    headers?: Record<string, string>,
  ): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(baseUrl + url, body, {
        headers,
      })
      return response.data
    } catch (error) {
      handleApiError(error)
      throw error // Re-throw the error after handling
    }
  }
}

function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('Response error:', error.response.data)
    } else if (error.request) {
      console.error('Request error:', error.request)
    } else {
      console.error('General error:', error.message)
    }
  } else {
    console.error('Non-Axios error:', error)
  }
}

export default ApiService
