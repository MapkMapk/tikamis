import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export default async function(login, password) {
  const response = await mechanicApiClient.post(`http://test186.ru:9080/mechanic-api/get-posts/`, {
    login,
    password
  })
  if (response) {
    return response.data
  }
}