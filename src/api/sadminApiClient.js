import axios from 'axios';
import router from '@/router/index.js';
import { useSadminUserStore } from '@/stores/sadmin/sadminUser.js'
import { responseStatusesHandler } from '@/api/responseStatusesHandler.js'

const sadminApiClient = axios.create({
  validateStatus: (status) => status < 500,
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL + '/sadmin-api'
});

sadminApiClient.interceptors.request.use((config) => {
  const sadminUserStore = useSadminUserStore();
  if (sadminUserStore.accessToken) {
    config.headers.authorization = `Bearer ${sadminUserStore.accessToken}`;
  }
  return config;
});

sadminApiClient.interceptors.response.use(
  async (response) => {
    const sadminUserStore = useSadminUserStore();
    // console.log('ЧЕКПОИНТ - 1');
    if (response.status === 401 && sadminUserStore.accessToken) {
      // console.log('ЧЕКПОИНТ - 2');
      let { data } = await axios
        .post(
          import.meta.env.VITE_AXIOS_BASE_URL + '/sadmin-api/refresh',
          {},
          {
            headers: {
              Authorization: `Bearer ${sadminUserStore.refreshToken}`
            }
          }
        )
        .catch(async (error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('sadminUser');
            await router.push('/sadmin/auth');
          }
        });
      // console.log('ЧЕКПОИНТ - 3');
      sadminUserStore.accessToken = data.accessToken;
      sadminUserStore.refreshToken = data.refreshToken;
      return await sadminApiClient({
        ...response.config,
        headers: {
          common: {
            ['Authorization']: `Bearer ${data.accessToken}`,
            ['Content-Type']: 'application/json'
          }
        }
      });
    }
    responseStatusesHandler(response)
    return response;
  },
  (error) => {
    console.log(error)
    alert('Произошла ошибка на сервере, код ошибки 500+')
    return Promise.reject(error);
  }
);

export { sadminApiClient };
