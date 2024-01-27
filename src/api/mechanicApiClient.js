import axios from 'axios';
import router from '@/router/index.js';
import { useMechanicUserStore } from '@/stores/mechanic/mechanicUser.js';
import { responseStatusesHandler } from '@/api/responseStatusesHandler.js'

const mechanicApiClient = axios.create({
  validateStatus: (status) => status < 500,
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL + '/mechanic-api'
});

mechanicApiClient.interceptors.request.use((config) => {
  const mechanicUserStore = useMechanicUserStore();
  if (mechanicUserStore.accessToken) {
    config.headers.authorization = `Bearer ${mechanicUserStore.accessToken}`;
  }
  return config;
});

mechanicApiClient.interceptors.response.use(
  async (response) => {
    const mechanicUserStore = useMechanicUserStore();
    // console.log('ЧЕКПОИНТ - 1');
    if (response.request.responseURL === '/get-posts') {
      return response;
    }
    if (response.status === 401 && mechanicUserStore.accessToken) {
      // console.log('ЧЕКПОИНТ - 2');
      let { data } = await axios
        .post(
          import.meta.env.VITE_AXIOS_BASE_URL + '/mechanic-api/refresh',
          {},
          {
            headers: {
              Authorization: `Bearer ${mechanicUserStore.refreshToken}`
            }
          }
        )
        .catch(async (error) => {
          if (error.response.status === 401) {
           localStorage.removeItem('mechanicUser');
            localStorage.removeItem('mechanicOrder')
            await router.push('/mechanic/auth');
          }
        });
      // console.log('ЧЕКПОИНТ - 3');
      mechanicUserStore.accessToken = data.accessToken;
      mechanicUserStore.refreshToken = data.refreshToken;
      return await mechanicApiClient({
        ...response.config,
        headers: {
          common: {
            ['Authorization']: `Bearer ${data.accessToken}`,
            ['Content-Type']: 'application/json'
          }
        }
      });
    }
    responseStatusesHandler(response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export { mechanicApiClient };
