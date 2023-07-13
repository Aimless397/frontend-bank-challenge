import axios from 'axios'

const bankApi = axios.create({
  baseURL: 'http://localhost:3000/api',
})

bankApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token')

  if (token) {
    config.headers['auth-token'] = token
  }

  return config
})

export default bankApi
