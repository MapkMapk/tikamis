import axios from 'axios';
import Refresh from './mechanicApi/_post/Refresh.vue';

const apiClient = axios.create();

apiClient.interceptors.response.use(

  async(response) => {
    // const {responseStatus} = response;
    // if (responseStatus === 401) {
    //   const accessToken = await Refresh()
    //   if (accessToken) {
    //     return await apiClient({
    //       headers: {
    //         common: {
    //           'Authorization': `Bearer ${accessToken}`,
    //         }
    //       }
    //     });
    //   } else {
    //     /// Надо разлогинить механика и редиректнуть на страницу выбора нового, но из аккаунта не выкидывать.
    //   }
    // }
  }

)