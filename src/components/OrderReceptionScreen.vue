<template>
    <section
      v-if="props.isVisible"
      class="z-50 flex justify-center items-center fixed w-full h-screen left-0 top-0 bg-gray-848484"
    >
      <ModalBoolean
        @callback="confirmRemoveWork"
        :is-visible="isModalVisible"
        :primary-button-component="BaseButtonFilledRed"
        main-title="Удалить услугу из заказа?"
        main-text="Вы сможете её снова включить в заказ"
        primary-button-text="Да, удалить"
        secondary-button-text="Отмена"
      />
      <FakeWorkAdd 
        v-if="isFakeVisible"
        :is-visible="isFakeVisible"
        :selected-works="orderSelectedWorks"
        @update:selectedWorks="updateSelectedWorks"
        @close="FakeClose"/>
      <div class="flex flex-col justify-start items-start bg-white w-[1133px] h-[971px]">
        <div class="ml-[30px] w-[1103px] mtForAnyone">
          <!-- Заголовок -->
          <div class="flex justify-start w-full">
            <h1>Новый заказ — Пост №{{ props.blockData.postNumber }}</h1>
          </div>
          <!-- Дата и время записи -->
          <div class="flex justify-start w-full h-[100px]">
            <!-- Дата записи -->
            <div>
              <p class="mb-[10px]">Дата записи</p>
              <TabularFilterDateReadOnly :unixDate="clientsDate" />
            </div>
            <!-- Время записи -->
            <div class="ml-[30px]">
              <p class="mb-[10px]">Время записи</p>
              <input type="string" v-model="clientsTime" class="base-input text-2xl w-[250px]" />
            </div>
          </div>
          <!-- Временные окна -->
          <div class="flex w-full">
            <!-- Время для услуг -->
            <div class="flex flex-col w-[25%]">
              <p class="mb-[10px]">Время для услуг:</p>
              <div class="flex items-center w-[222px] h-[60px] px-[20px] bg-green orderTimeTypography">
                {{  convertMinutesToTime(props.orderTime) }}
              </div>
            </div>
            <!-- Свободно для записи -->
            <div class="flex flex-col w-[75%]">
              <p class="mb-[10px]">Свободно для записи:</p>
              <div class="freeTimeWindows flex flex-wrap gap-[10px] max-h-[150px] h-[150px] overflow-auto">
                <div
                  v-for="block in freeBlocks.filter(block => block.postNumber === props.blockData.postNumber)"
                  :key="block.id"
                  class="flex items-center justify-center w-[250px] h-[60px] bg-gray-f5f5f5 orderTimeFreeTypography"
                >
                  {{ convertMinutesToTime(block.blockStart) }} - {{ convertMinutesToTime(block.blockEnd) }}
                </div>
              </div>
            </div>
          </div>
          <!-- Информация по автомобилю -->
          <div class="flex w-full">
            <!-- Телефон клиента -->
            <div>
              <p class="mb-[10px]">Телефон клиента</p>
              <input v-model="clientsPhone" type="string" class="base-input text-2xl w-[250px]" />

            </div>
            <!-- Номер автомобиля -->
            <div class="ml-[30px]">
              <p class="mb-[10px]">Номер автомобиля</p>
              <input v-model="clientsCarNumber" type="string" class="base-input text-2xl w-[250px]" />

            </div>
            <div class="ml-[30px]">
              <p class="mb-[10px]">Регион</p>
              <input v-model="clientsCarRegion" type="number" class="base-input text-2xl w-[250px]" />

            </div>
          </div>
          <!-- Список услуг  -->
          <div class="flex flex-col w-full pr-[30px] mb-[60px] max-h-[250px] overflow-auto">
            <div class="workListHeader min-h-[53px] py-[10px] flex items-center">
              <p>Список услуг</p>
            </div>
            <div
              v-for="(work, index) in orderSelectedWorks"
              :key="work.id"
              class="workList flex justify-between items-center h-[80px]"
            >
              <p>{{ work.name }}</p>
              <div
                @click="openWorkWind(index)"
                class="h-[80px] w-[63px] px-[20px] flex justify-between items-center cursor-pointer"
              >
                <svg
                  width="23"
                  height="25"
                  viewBox="0 0 23 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.25 3.75H1.25C0.559644 3.75 0 4.30964 0 5C0 5.69036 0.559644 6.25 1.25 6.25H1.4056L3.47169 21.7456C3.72009 23.6086 5.30928 25 7.18879 25H15.3112C17.1907 25 18.7799 23.6086 19.0283 21.7456L21.0944 6.25H21.25C21.9404 6.25 22.5 5.69036 22.5 5C22.5 4.30964 21.9404 3.75 21.25 3.75H16.25C16.25 1.67893 14.5711 0 12.5 0H10C7.92893 0 6.25 1.67893 6.25 3.75ZM8.75 3.75C8.75 3.05964 9.30964 2.5 10 2.5H12.5C13.1904 2.5 13.75 3.05964 13.75 3.75H8.75ZM5.94976 21.4152L3.92773 6.25H18.5723L16.5502 21.4152C16.4674 22.0362 15.9377 22.5 15.3112 22.5H7.18879C6.56229 22.5 6.03256 22.0362 5.94976 21.4152Z"
                    fill="#080808"
                  />
                  <rect x="8" y="10" width="2.3" height="9" fill="#080808" />
                  <rect x="12" y="10" width="2.3" height="9" fill="#080808" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- Кнопочки -->
        <div class="flex w-full">
          <BaseButtonFilledAdd @click="FakeOpen" class="flex-1 w-[337px] ml-[30px]">
            Добавить услугу
          </BaseButtonFilledAdd>
          <BaseButtonFilledGreen @click="clicked" class="flex-1 w-[337px] ml-[30px]">
            Создать заказ
          </BaseButtonFilledGreen>
          <BaseButtonFilledLight @click="emit('close', false)" class="flex-1 w-[337px] ml-[30px] mr-[30px]">
            Отмена
          </BaseButtonFilledLight>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import ModalBoolean from '@/components/ModalBoolean.vue';
  import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
  import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
  import BaseButtonFilledRed from '@/components/BaseButtonFilledRed.vue';
  import { ref } from 'vue';
  import { sadminApiClient } from '@/api/sadminApiClient.js';
  import { directorApiClient } from '@/api/directorApiClient.js';
  import BaseButtonFilledAdd from '@/components/BaseButtonFilledAdd.vue';
  import TabularFilterDateReadOnly from '@/components/Tabular/TabularFilterDateReadOnly.vue';
  import { useStore } from '@/stores/main.js';
  import FakeWorkAdd from '@/components/FakeWorkAdd.vue';
  import isEnv from '@/utils/isEnv.js';
  let props = defineProps({
    isVisible: {
      type: Boolean,
      default: true, // Значение по умолчанию для isVisible
    },
    postNumber: {
      type: Number,
      default: 1, // Значение по умолчанию для isVisible
    },
    orderTime: {
      type: Number,
      default: 0,
    },
    unixDate: Number,
    blockData: Object,
    orderMinutes: Number,
    freeBlocks: Array,
    selectedWorks: Array,
    isSadmin: Boolean
  });
        // const Fake = ref({});
        // Fake.value.isVisible=false;
        // function FakeOpen(data){
        // // Fake.value.isVisible = true;
        // // Fake.isVisible = true;
        // Fake.value.isVisible = true;
        // order.value.isVisible = false;
        // console.log(data);
        // }
        // function FakeClose(data){
        // Fake.isVisible = false;
        
        // if (data !== undefined){
        //     order.value.selectedWorks = data;
        // }
        // order.value.isVisible = true;
        // }

        const isFakeVisible = ref(false);
        const orderSelectedWorks = ref([]); orderSelectedWorks.value = props.selectedWorks;
        function FakeOpen() {
          isFakeVisible.value = true;
          console.log(isFakeVisible.value)
        }

        function FakeClose(allSelectedWorks) {
          isFakeVisible.value = false;
          if (allSelectedWorks) {
            // Действия с записью массива в переменную
            // Например:
            orderSelectedWorks.value = allSelectedWorks;
          }
        }
    
        const storeApiCall = props.isSadmin ? sadminApiClient : directorApiClient;
  let isModalVisible = ref(false);
  let workToDeleteIndex = ref(null);
  
  const clientsCarNumber = ref('');
  const clientsCarRegion = ref('');
  const clientsPhone = ref('');
  const clientsTime = ref('');
  const clientsDate = ref(); clientsDate.value = props.unixDate;

  function openWorkWind(index) {
    workToDeleteIndex.value = index;
    isModalVisible.value = true;
  }
  let emit = defineEmits(['callback', 'close']);
  
  function confirmRemoveWork() {
    if (workToDeleteIndex.value !== null) {
      // eslint-disable-next-line vue/no-mutating-props
      orderSelectedWorks.value.splice(workToDeleteIndex.value, 1);
    }
    isModalVisible.value = false;
    workToDeleteIndex.value = null;
  }
  
 
  
  async function clicked() {
    try {
    //const carCenterId = useStore().carCenterId ? (Array.isArray(useStore().carCenterId) ? useStore().carCenterId[0] : useStore().carCenterId) : null;
    const carCenterId = useStore().carCenterId ? useStore().carCenterId[0] : null;
    const postNumber = props.blockData.postNumber;
    const unixDate = props.unixDate;
    const timeInMinutes = convertTimeToMinutes(clientsTime.value);
    const phone = clientsPhone.value;
    const plate = clientsCarNumber.value;
    let region = clientsCarRegion.value;
    const works = orderSelectedWorks.value;

    let missingFields = [];

    
    if (!timeInMinutes) missingFields.push('Время записи');
    if (!phone) missingFields.push('Телефон клиента');
    if (!plate) missingFields.push('Номер автомобиля');
    if (!region) missingFields.push('Регион');
    if (!works || works.length === 0) missingFields.push('Список услуг');

    if (missingFields.length > 0) {
      alert('Отсутствуют необходимые данные:   ' + missingFields.join(', '));
      return;
    }


    region = String(region);
    const workIds = works.map(work => work.id);
    

    const filters = {
      carCenterId,
      postNumber,
      unixDate,
      timeInMinutes,
      phone,
      plate,
      region,
      works: workIds 
    };

    console.log('Filters:', filters); // Для проверки данных перед отправкой
    
    const response = await storeApiCall.post('/order', filters);
    console.log('Response:', response);
    if(response.status==200){
      emit('close',true);
    }
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
  }
    // console.log('carCenterId:', useStore().carCenterId);//он может быть null или массивом из 1 эллемента
    // console.log('postNumber:', props.blockData.postNumber);
    // console.log('unixDate:', props.unixDate);
    // console.log('timeInMinutes:', convertTimeToMinutes(clientsTime.value));
    // console.log('phone:', clientsPhone.value);
    // console.log('plate:', clientsCarNumber.value);
    // console.log('region:', clientsCarRegion.value);
    // console.log('works:', orderSelectedWorks.value);//это массив

  }
  
  function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = mins.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }
  function convertTimeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
  </script>
  
  <style>
  h1 {
    font-family: Inter;
    font-size: 36px;
    font-weight: 500;
    line-height: 43.57px;
    text-align: left;
  }
  
  p {
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    line-height: 21.78px;
    text-align: left;
  }
  
  .mtForAnyone {
    margin-top: 10px;
  }
  
  .mtForAnyone > div {
    margin-top: 30px;
  }
  
  .orderTimeTypography {
    font-family: Inter;
    font-size: 36px;
    font-weight: 400;
    line-height: 50.4px;
    text-align: left;
    color: #ffffff;
  }
  
  .orderTimeFreeTypography {
    font-family: Inter;
    font-size: 36px;
    font-weight: 400;
    line-height: 50.4px;
    text-align: left;
    color: #080808;
  }
  
  .workListHeader {
    border: 1px solid #a1a4ad;
    background: #f5f5f5;
    padding: 0 20px;
  }
  
  .workListHeader p {
    font-family: Inter;
    font-size: 18px;
    font-weight: 400;
    line-height: 21.78px;
    text-align: left;
    color: #a1a4ad;
  }
  
  .workList {
    border: 1px solid #a1a4ad; /* Устанавливаем толщину, стиль и цвет границы */
    border-top: none; /* Убираем верхнюю границу */
    background: white;
    padding: 0 0 0 20px;
  }
  
  .workList p {
    font-family: Inter;
    font-size: 24px;
    font-weight: 400;
    line-height: 29.05px;
    text-align: left;
    color: #080808;
  }
  </style>