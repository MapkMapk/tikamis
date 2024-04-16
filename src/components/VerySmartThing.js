import isEnv from '@/utils/isEnv.js';

import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';

import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';

export function VerySmartThing() {
    const isSadmin = isEnv('sadmin');
    const apiCall = isSadmin ? sadminApiClient : directorApiClient;
    const sadminServiceStationsStore = isSadmin ? useSadminServiceStationsStore() : null;

    return { isSadmin, apiCall, sadminServiceStationsStore };
  }
export const { isSadmin, apiCall, sadminServiceStationsStore } = VerySmartThing();