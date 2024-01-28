import { directorApiClient } from '@/api/directorApiClient.js'
import router from '@/router/index.js'

export default async function() {
  const response = await directorApiClient.post('/logout')
  if (response.status === 200) {
    localStorage.removeItem('directorUser');
    await router.push('/director/auth');
  }
}