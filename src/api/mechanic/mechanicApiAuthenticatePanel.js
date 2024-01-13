import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export default async function(login, password, postNumber) {
  try {
    const res = await mechanicApiClient.post('http://test186.ru:9080/mechanic-api/authenticate-panel', {
      login,
      password,
      postNumber
    })
    console.log(res)
    return res.data
  }
  catch (error) {
    console.log(error)
  }
}