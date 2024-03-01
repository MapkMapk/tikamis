import { directorApiClient } from '@/api/directorApiClient.js'

export default async function () {
  let { data } = await directorApiClient.get('/all-works')
  return data;
}