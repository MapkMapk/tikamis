import axios from 'axios';
import router from '@/router/index.js'
import { useDirectorUserStore } from '@/stores/director/directorUser.js'

const directorApiClient = axios.create({
  validateStatus: (status) => status < 500,
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL + '/director-api'
})

directorApiClient.interceptors.request.use((config) => {
  const directorUserStore = useDirectorUserStore();
  if (directorUserStore.accessToken) {
    config.headers.authorization = `Bearer ${directorUserStore.accessToken}`;
  }
  return config;
});

directorApiClient.interceptors.response.use(
  async (response) => {
    const directorUserStore = useDirectorUserStore();
    // console.log('ЧЕКПОИНТ - 1');
    if (response.status === 401 && directorUserStore.accessToken) {
      // console.log('ЧЕКПОИНТ - 2');
      let { data } = await axios
        .post(
          import.meta.env.VITE_AXIOS_BASE_URL + '/director-api/refresh',
          {},
          {
            headers: {
              Authorization: `Bearer ${directorUserStore.refreshToken}`
            }
          }
        )
        .catch(async (error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('directorUser');
            localStorage.removeItem('directorBase');
            await router.push('/director/auth');
          }
        });
      // console.log('ЧЕКПОИНТ - 3');
      directorUserStore.accessToken = data.accessToken;
      directorUserStore.refreshToken = data.refreshToken
      return await directorApiClient({
        ...response.config,
        headers: {
          common: {
            ['Authorization']: `Bearer ${data.accessToken}`,
            ['Content-Type']: 'application/json'
          }
        }
      });
    }
    if (response.status === 409) {
      alert(response.data);
    }
    if (response.status !== 200) {
      console.log(response);
    }
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export { directorApiClient };
