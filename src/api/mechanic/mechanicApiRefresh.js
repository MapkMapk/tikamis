import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export default async function() {
  return await mechanicApiClient.post('http://test186.ru:9080/mechanic-api/refresh', {}, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
    }
  })
}