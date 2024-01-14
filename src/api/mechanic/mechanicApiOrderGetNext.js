import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export default async function() {
  const response = await mechanicApiClient.get(`http://test186.ru:9080/mechanic-api/order/get-next`)
  console.log(response)
  if (response) {
    return response.data
  }
}