import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export default async function(mechanicId) {
  let response = await mechanicApiClient.post('http://test186.ru:9080/mechanic-api/mechanic-login', {
    mechanicId
  })
  console.log(response)
  return response.status !== 403;
}