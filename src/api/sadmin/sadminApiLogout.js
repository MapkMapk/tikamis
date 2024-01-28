import { sadminApiClient } from '@/api/sadminApiClient.js'
import router from '@/router/index.js'

export default async function() {
  const response = await sadminApiClient.post('/logout')
  if (response.status === 200) {
    localStorage.removeItem('sadminUser');
    await router.push('/sadmin/auth');
  }
}