import axios from 'axios'

const mechanicApiClient = axios.create({
  validateStatus: (status) => status < 500
})

mechanicApiClient.interceptors.request.use(config => {
  if (localStorage.getItem('accessToken')) {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
  }
  return config
})

mechanicApiClient.interceptors.response.use(
  async (response) => {
    console.log('ЧЕКПОИНТ - 1')
    if (response.request.responseURL === 'http://test186.ru:9080/mechanic-api/get-posts/') {
      return response
    }
    if (response.status === 401 && localStorage.getItem('accessToken')) {
      console.log('ЧЕКПОИНТ - 2')
      let { data } = await axios.post('http://test186.ru:9080/mechanic-api/refresh', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
        }
      }).catch((error) => {
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
    return response
  },
  (error) => {
    return error
  }
)

export { mechanicApiClient }