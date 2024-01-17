import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export default async function (orderId, workId) {
  console.log(orderId, workId)
  await mechanicApiClient.delete('/order/work', { data: { orderId, workId } })
}
