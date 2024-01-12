import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export default async function(login, password) {
  try {
    const response = await mechanicApiClient.post(`http://test186.ru:9080/mechanic-api/get-posts/`, {
     login,
     password
    })
    return response.data
  }
  catch (error) {
    console.log(error)
  }
}