import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export default async function() {
  let { data } = await mechanicApiClient.get('http://test186.ru:9080/mechanic-api/list')
  if (data) {
    return data
  }
}