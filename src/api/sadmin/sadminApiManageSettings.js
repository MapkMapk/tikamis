import { sadminApiClient } from '@/api/sadminApiClient.js'

export default async function () {
  let { data } = await sadminApiClient.get('manage/settings');
  return data
}