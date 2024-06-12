<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <ModalBoolean
      v-if="modal && modal.callback"
      @callback="modal.callback"
      :is-visible="modal.isVisible"
      :primary-button-component="BaseButtonFilledDark"
      :main-title="modal.mainTitle"
      :primary-button-text="modal.primaryButtonText"
      :secondary-button-text="modal.secondaryButtonText"
    />
    <MainHeader />
    <MainHeaderGap />

    <TabularSection>
      <TabularPrimeTitle class="mb-2">Сервисная история {{ unixToDatePeriodHeader(filterStartDate, filterPeriod) }}</TabularPrimeTitle>
      <TabularFiltersWrapper>
      <TabularFilterPeriod @updatePeriod="selectOptionHandler" style="flex: 184;"/>
      <TabularFilterDate @updateDate="selectDateHandler" style="flex: 614;"/>

      <TabularButtonCross style="flex: 60; cursor: pointer;" @click="resetToDefaultFilters" />
      <TabularButtonApplyFilters style="flex: 217;" @click="fetchData" />
    </TabularFiltersWrapper>
    </TabularSection>

    <TabularTable style="display: block; padding: 30px;">
      <TabularTableRow style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr .2fr;">
        <TabularTableCellTop style="padding-left: 10px;">Работы</TabularTableCellTop>
        <TabularTableCellTop style="padding-left: 10px;">Время записи</TabularTableCellTop>
        <TabularTableCellTop style="padding-left: 10px;">Телефон</TabularTableCellTop>
        <TabularTableCellTop style="padding-left: 10px;">Автомобиль</TabularTableCellTop>
        <TabularTableCellTop></TabularTableCellTop>
      </TabularTableRow>
  <TabularTableRow v-for="item in items" :key="item.orderId" v-if="items.length" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr .2fr;">
    <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '2fr' }" style="padding-left: 10px;">
      {{ item.works.length === 1 ? item.works[0].name : '' }}
      <details v-if="item.works.length > 1" class="custom-details" :style="{ width: CELL_WIDTH }">
        <summary class="flex" style="justify-content: space-between;">
          {{ item.works[0].name }} <strong>ещё {{ item.works.length - 1 }}</strong>
        </summary>
        <ul>
          <li v-for="work in item.works.slice(1)" :key="work.id">{{ work.name }}</li>
        </ul>
      </details>
    </TabularTableRowCell>
    <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '1fr' }" style="padding-left: 10px; align-self: center;">{{ unixToData(item.bookingTime) }}</TabularTableRowCell>
    <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '1fr' }" style="padding-left: 10px;    align-self: center;">{{ item.phone }}</TabularTableRowCell>
    <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '1fr' }" style="padding-left: 10px;    align-self: center;">{{ item.plate }}</TabularTableRowCell>
    <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '.2fr' }" class="flex">
      <!-- Кликабельное изображение крестика -->
    </TabularTableRowCell>
  </TabularTableRow>
  <TabularTableRow v-else class="h-[50vh]">
				<FiltersNoData></FiltersNoData>
			</TabularTableRow>
</TabularTable>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import ModalBoolean from '@/components/ModalBoolean.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import directorApiGetCustomerRecords from '@/api/director/directorApiGetServiceHistory.js';
import sadminApiGetCustomerRecords from '@/api/sadmin/sadminApiGetServiceHistory.js';
import unixToData from '@/utils/time/unixToData.js';

import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue';
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
//import deleteCustomerRecord from '@/api/director/directorApiDeleteCustomerRecord';

import '@vuepic/vue-datepicker/dist/main.css';
import { unixToDatePeriodHeader, getUnixToday } from '@/utils/time/dateUtils.js';
import FiltersNoData from '@/components/Tabular/FiltersNoData.vue';

import TabularTableCellTop from '@/components/Tabular/TabularTableCellTop.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';
import TabularTable from '@/components/Tabular/TabularTable.vue';

import TabularButtonCross from '@/components/Tabular/TabularButtonCross.vue';
import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue';

import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import isEnv from '@/utils/isEnv.js';
const apiClient = isEnv('sadmin') ? sadminApiGetCustomerRecords : directorApiGetCustomerRecords ;
const serviceStationsStore = useSadminServiceStationsStore();

const selectedCarCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к serviceStationsStore
      return isEnv('sadmin') 
        ? [serviceStationsStore?.getSelectedServiceStation().id]
        : null;
    });

const CELL_HEIGHT = '100%';
const CELL_WIDTH = '100%';



async function deleteItem(item) {
    const isConfirmed = confirm('Вы уверены, что хотите удалить этот элемент?');
    if (!isConfirmed) {
        return; // Если пользователь отказался, прерываем выполнение функции
    }

    try {
        // Вызываем функцию удаления и передаём orderId
        // Удаляем элемент из списка
        items.value = items.value.filter(i => i.orderId !== item.orderId);
    } catch (error) {
        console.error('Ошибка при удалении элемента:', error);
    }
}

onMounted(fetchData);





let filterStartDate = ref(getUnixToday());
let filterPeriod = ref('month');

function selectDateHandler(date) {
  console.log(date);
  filterStartDate.value = (date);
  console.log(filterStartDate.value);
}

const items = ref([]);
const filters = ref({
  interval: filterPeriod,
  dateStart: filterStartDate,
  works: null,
  carCenters: selectedCarCenterIds.value,
  page: 1
});

async function resetToDefaultFilters() {
  try {
    let __tempDateStart = filterStartDate.value;
    let __tempPeriod = filterPeriod.value;
    // значения по умолчанию для filterStartDate и filterPeriod
    filterStartDate.value = getUnixToday(); // Значение по умолчанию для даты
    filterPeriod.value = 'month'; // Значение по умолчанию для периода
    

    // Применяем фильтры
    await fetchData();
  } catch (error) {
    console.error('Error applying default filters:', error);
  }
}
async function fetchData() {
  
  try {
    const response = await apiClient(filters.value);
    
    items.value = response.items;
  } catch (error) {
    console.error('Error applying filters:', error);
  }
}
function selectOptionHandler(option){
      filterPeriod.value = option;
      console.log('Значение опции:', option);
    }
//d
</script>

<script>



export default {
  components: {
    MainHeader,
    ModalBoolean,
    MainHeaderGap,
    TabularTableRow,
    TabularTable,
    TabularFilterPeriod
  },
  methods:{
    dateChangeHandler(date) {
      // Обработка новой выбранной даты
    }
  },
  setup() {
    function dateSelectedHandler(selectedDate) {
      // Обновите фильтры, передав выбранную дату
      filters.value.dateStart = selectedDate;
    }

    return {
      items,
      fetchData,
      resetToDefaultFilters,
      dateSelectedHandler
    };
  }
};


</script>

<style scoped>
.custom-details summary {
  list-style: none;
}

.custom-details summary::-webkit-details-marker {
  display: none;
}

.custom-details  {
  margin-right: 50px;
}

.custom-details[open] summary:after {
  transform: rotate(-90deg);
}
.report-table-row:nth-child(odd) {
  background-color: #f5f5f5;
}
.custom-details ul {
  padding-left: 0; /* Убираем стандартный отступ слева у списка */
  list-style-type: none; /* Убираем маркеры списка */
}

.custom-details li {
  display: block; /* Каждый элемент списка будет занимать всю ширину контейнера */
  text-align: left; /* Выравнивание текста по левому краю */
  padding: 4px 0; /* Добавляем немного отступа для каждого элемента списка */
}

/* Стили для выравнивания контента внутри details */
.custom-details summary {
  display: flex; /* Используем flexbox для выравнивания заголовка */
  justify-content: space-between; /* Распределяем пространство между элементами */
  align-items: center; /* Выравниваем элементы по центру по вертикали */
  padding: 4px 0; /* Добавляем немного отступа */
}

</style>

