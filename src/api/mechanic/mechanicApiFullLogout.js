import { mechanicApiClient } from '@/api/mechanicApiClient.js';
import router from '@/router/index.js';
import { useMechanicUserStore } from '@/stores/mechanic/mechanicUser';
import { useMainStore } from '@/stores/shared/main.js';

export default async function () {
  const mainStore = useMainStore();
  const mechanicUserStore = useMechanicUserStore();

  const response = await mechanicApiClient.post('/mechanic-logout');
  if (response.status === 200) {
    mechanicUserStore.$reset();
    mainStore.$reset();
    await router.push('/mechanic/auth');
  }
}
