import Axios from 'axios'

const apiClient = Axios.create({
  baseURL: 'https://api.adviceslip.com',
  headers: {
    Accept: 'application/json',
  },
})

export default apiClient
