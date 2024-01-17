import axios from 'axios'
import mechanicApiMechanicLogout from '@/api/mechanic/mechanicApiMechanicLogout.js'

const mechanicApiClient = axios.create({
  validateStatus: (status) => status < 500,
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL + '/mechanic-api'
})

mechanicApiClient.interceptors.request.use((config) => {
  if (localStorage.getItem('accessToken')) {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
  }
  return config
})

mechanicApiClient.interceptors.response.use(
  async (response) => {
    console.log('ЧЕКПОИНТ - 1')
    if (response.request.responseURL === '/get-posts') {
      return response
    }
    if (response.status === 401 && localStorage.getItem('accessToken')) {
      console.log('ЧЕКПОИНТ - 2')
      let { data } = await axios
        .post(
          import.meta.env.VITE_AXIOS_BASE_URL + '/mechanic-api/refresh',
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
            }
          }
        )
        .catch((error) => {
          console.log(error)
        })
      console.log('ЧЕКПОИНТ - 3')
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      return await mechanicApiClient({
        ...response.config,
        headers: {
          common: {
            ['Authorization']: `Bearer ${data.accessToken}`,
            ['Content-Type']: 'application/json'
          }
        }
      })
    }
    if (
      response.status === 401 &&
      !localStorage.getItem('accessToken') &&
      localStorage.getItem('mechanicUserId')
    ) {
      mechanicApiMechanicLogout()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
    if (response.status === 409) {
      alert(response.data)
    }
    if (response.status === 400 && response.status === 403) {
      console.log(response)
    }
    return response
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export { mechanicApiClient }
