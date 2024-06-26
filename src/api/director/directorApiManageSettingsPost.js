import { directorApiClient } from '@/api/directorApiClient.js'

export default async function({bookingAvailable, postsEquipment, shiftsStart, shiftsFinish, timeZoneOffsetHours,mapLink}) {
  const response = await directorApiClient.post('manage/settings', {
    bookingAvailable,
    postsEquipment,
    shiftsStart,
    shiftsFinish,
    timeZoneOffsetHours,
    mapLink
  })
  return response
}