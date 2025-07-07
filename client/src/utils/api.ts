import axios from 'axios'
import { getAuth } from 'firebase/auth'

const api = axios.create({
  baseURL: 'http://localhost:7800/api', // Adjust your backend URL as needed
})

// Add Authorization token automatically to every request
api.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
