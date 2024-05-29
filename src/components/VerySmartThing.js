import isEnv from '@/utils/isEnv.js';

import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';

import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';

export function VerySmartThing() {
    const isSadmin = isEnv('sadmin');
    const apiClient = isSadmin ? sadminApiClient : directorApiClient;
    const sadminServiceStationsStore = isSadmin ? useSadminServiceStationsStore() : null;

    return { isSadmin, apiClient, sadminServiceStationsStore };
  }
export const { isSadmin, apiClient, sadminServiceStationsStore } = VerySmartThing();