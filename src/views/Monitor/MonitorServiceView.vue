<template class="overflow-hidden">
    <div class="overflow-hidden">
        <div v-if="serviceInfo" :style="{ height: `${96 / 580 * 100}vh` }" class="flex mt-[1vh] mx-[40px]">
            <div class="flex-1 flex justify-start items-center bg-gray-100  m-2">
                <BaseSvgIcon name="tikamis-monitor-logo" class="w-auto h-[100%]" />
            </div>

            <div class="flex-1 flex justify-center items-center bg-gray-100  m-2">
                <p class="typografy-600">{{ currentTime }}</p>
            </div>

            <div class="flex-1 flex justify-end items-center bg-gray-100 m-2">
                <div class="flex flex-col items-start">
                    <p class="typografy-500">{{ currentWeekDay }}</p>
                    <p class="typografy-500">{{ currentDate }}</p>
                </div>
            </div>
        </div>
        <div v-if="serviceInfo" class="mx-[40px]">
            <div class="flex">
                <div class="flex-1 flex justify-center items-center bg-gray-100 m-2">
                    <p class="typografy-700">Автомобиль</p>
                </div>
                <div class="flex-1 flex justify-center items-center bg-gray-100 m-2">
                    <p class="typografy-700">Пост</p>
                </div>
                <div class="flex-1 flex justify-center items-center bg-gray-100 m-2">
                    <p class="typografy-700">Время заезда</p>
                </div>
            </div>
            <div class="car-list adaptive-height" >
                <div v-for="car in serviceInfo.queue" :key="car.car" :class="{ waiting: car.is_waiting }"
                    class="flex unwaiting">
                    <div class="flex-1 flex justify-center items-center bg-gray-100 m-2">
                        <p>{{ car.car }}</p>
                    </div>
                    <div class="flex-1 flex justify-center items-center bg-gray-100 m-2">
                        <p>№{{ car.post }}</p>
                    </div>
                    <div class="flex-1 flex justify-center items-center bg-gray-100 m-2">
                        <p>{{ car.time }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchServiceInfo } from '@/api/monitor/monitorSyncQueue';
  import { fetchQueueUpdate } from '@/api/monitor/monitorGetUpdate';
  import BaseSvgIcon from '@/components/BaseSvgIcon.vue';

  const route = useRoute();
  const serviceInfo = ref(null);
  const queueIndex = ref(null);
  let syncInterval;
  let timeInterval;
  let pollingActive = ref(true);
  
  const currentTime = ref('');
  const currentWeekDay = ref('');
  const currentDate = ref('');
  let lastCarCenterTime;
  let lastSyncAt;
  
  function formatTimeAndDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    const optionsDate = { weekday: 'long', day: 'numeric' };
    const monthsGenitive = [
    'января', 'февраля', 'марта', 'апреля',
    'мая', 'июня', 'июля', 'августа',
    'сентября', 'октября', 'ноября', 'декабря'
    ];
    const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'long' });
    const dayOfMonth = date.getUTCDate();
    const month = monthsGenitive[date.getUTCMonth()];
    const year = date.getUTCFullYear();
  
    return {
      dayOfWeek: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
      currentDate: `${dayOfMonth} ${month} ${year}`,
      currentTime: `${hours}:${minutes}`
    };
  }
  
  async function loadServiceInfo() {
    try {
      const info = await fetchServiceInfo(route.query.id);
      serviceInfo.value = info;
      queueIndex.value = info.queue_index;
      lastCarCenterTime = info.unix_time_now;
      lastSyncAt = Math.floor(Date.now() / 1000);
      updateFormattedTime();
      startLongPolling();
      startRegularSync();
      startUpdatingTime();
    } catch (error) {
      console.error('Failed to load service info:', error);
    }
  }
  
  async function startLongPolling() {
    if (!pollingActive.value) return; // Прерывание, если опрос остановлен
    try {
      const update = await fetchQueueUpdate(route.query.id, queueIndex.value);
      if (update) {
        serviceInfo.value.queue = update.queue;
        queueIndex.value = update.new_queue_index;
      }
    } catch (error) {
      if (error.message === 'CarCenterNotFound') {
        pollingActive.value = false; // Остановка опроса
      } else {
        console.error('Failed to fetch updates:', error);
      }
    } finally {
      if (pollingActive.value) {
        setTimeout(startLongPolling, 30000); // Запускаем новый запрос через 30 секунд
      }
    }
  }
  
  async function syncQueue() {
    try {
      const info = await fetchServiceInfo(route.query.id);
      serviceInfo.value = info;
      queueIndex.value = info.queue_index;
      lastCarCenterTime = info.unix_time_now;
      lastSyncAt = Math.floor(Date.now() / 1000);
      pollingActive.value = true; // Возобновление опроса
      startLongPolling();
    } catch (error) {
      console.error('Failed to sync service info:', error);
    }
  }
  
  function updateFormattedTime() {
    const now = Math.floor(Date.now() / 1000);
    const difference = now - lastSyncAt;
    const currentTimeUnix = lastCarCenterTime + difference;
    const formatted = formatTimeAndDate(currentTimeUnix);
    currentTime.value = formatted.currentTime;
    currentDate.value = formatted.currentDate;
    currentWeekDay.value = formatted.dayOfWeek;
  }
  
  function startUpdatingTime() {
    timeInterval = setInterval(updateFormattedTime, 10000); // Обновляем время каждые 10 секунд
  }
  
  function startRegularSync() {
    syncInterval = setInterval(syncQueue, 3600000); // Синхронизация каждый час
  }
  
  onMounted(loadServiceInfo);
  onUnmounted(() => {
    clearInterval(syncInterval);
    clearInterval(timeInterval);
  });
  </script>
  
  <style scoped>
  .waiting > div > p {
    color: red;
}
.unwaiting > div > p {
    font-family: Inter;
font-size: 36px;
font-weight: 700;
line-height: 43.57px;
text-align: center;


}
.car-list > div:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.1); /* Черный цвет с прозрачностью 10% для нечетных элементов */
}
.typografy-500,.typografy-600,.typografy-700{
    color: #080808;
}
.typografy-500{
    font-family: Inter;
font-size: 30px;
font-weight: 500;
line-height: 36.31px;
text-align: left;

}
.typografy-600{
    font-family: Inter;
font-size: 64px;
font-weight: 600;
line-height: 77.45px;
text-align: left;
}
.typografy-700{
    font-family: Inter;
font-size: 46px;
font-weight: 700;
line-height: 55.67px;
text-align: left;
}   
@media screen and (min-height: 1080px) {
    .adaptive-height {
        max-height: 75.5vh; /* Пример: максимальная высота 60% от высоты экрана, если высота экрана меньше или равна 600px */
    }
}
@media screen and (min-height: 963px) and (max-height: 1079px){
    .adaptive-height {
        max-height: 73vh; /* Пример: максимальная высота 60% от высоты экрана, если высота экрана меньше или равна 600px */
    }
}
@media screen and (min-height: 630px) and (max-height: 963px){
    .adaptive-height {
        max-height: 71vh; /* Пример: максимальная высота 60% от высоты экрана, если высота экрана меньше или равна 600px */
    }
}
  </style>
  