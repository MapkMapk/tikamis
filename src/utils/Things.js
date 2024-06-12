import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';
import isEnv from '@/utils/isEnv.js';
import { computed } from 'vue';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';

export function toggleDetails(item) {
  item.detailsOpen = !item.detailsOpen;
}

export function formatTotalDowntime(dt) {
  const lastNum = dt % 10;
  if (lastNum === 1) return `${dt} минута`;
  if ([2, 3, 4].includes(lastNum)) return `${dt} минуты`;
  return `${dt} минут`;
}

export function formatCurrency(sum) {
  let formattedTotalLoss = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum);
  return formattedTotalLoss;
}

export function selectedCarCenterIds() {
  const serviceStationsStore = useSadminServiceStationsStore();
  return computed(() => {
    return isEnv('sadmin') 
      ? [serviceStationsStore?.getSelectedServiceStation().id]
      : null;
  });
}

export function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}
export function unixToData(unixTime, showTime = true, period = null) {
    const date = new Date(unixTime * 1000);
    const formatDate = (d) => {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      
      if (showTime) {
        return `${day}.${month}.${year} ${hours}:${minutes}`;
      } else {
        return `${day}.${month}.${year}`;
      }
    };
  
    if (period === null) {
      return formatDate(date);
    } else {
      const endDate = new Date(date);
      
      // Calculate the end date based on the period
      switch (period) {
        case 'week':
          endDate.setDate(date.getDate() + 7);
          break;
        case 'month':
          endDate.setMonth(date.getMonth() + 1);
          break;
        case 'year':
          endDate.setFullYear(date.getFullYear() + 1);
          break;
        case 'day':
        default:
          endDate.setDate(date.getDate() + 1);
          break;
      }
  
      const formattedStartDate = formatDate(date);
      const formattedEndDate = formatDate(endDate);
  
      return `${formattedStartDate} - ${formattedEndDate}`;
    }
  }