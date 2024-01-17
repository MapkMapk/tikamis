import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export default async function (login, password, postNumber) {
  const response = await mechanicApiClient.post('/authenticate-panel', {
    login,
    password,
    postNumber
  })
  return response.data
}
