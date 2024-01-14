import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export default async function() {
  const { data } = await mechanicApiClient.get(`/order/get-next`)
  return data
}