<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
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
    <DirectorReportComponent
    :is-filter-all-works-visible="false"
    @filtersApplied="applyFilters"
    @filtersReset="resetToDefaultFilters"
    @updateFilters="updateFilters"
    :is-filter-or-visible="false"
    :are-buttons-visible="displayedItems.length>0"
    @saveTable="onSave"
    @sendTable="onSend"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Подозрительная привязка телефонов и автомобилей {{ unixToDatePeriodHeader(filterDateStart, filterPeriod) }}</TabularPrimeTitle>
    </template>
    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns"  class="fat-boy" />
    </template>

    <template v-slot:tabular-table-table>
      
      <TabularTableRow
    v-for="(item, index) in displayedItems"
    v-if="displayedItems.length"
    :key="index"
    :item="item"
    style="grid-template-columns: 3fr 7fr 30px;"
    @click="toggleDetails(item)" 
    :open="item.detailsOpen"
  >
    <!-- Телефоны -->
    <TabularTableRowCell>
      <div v-if="item.phones.length <= 1">
        {{ item.phones[0] }}
      </div>
      <div v-else>
        <div>{{ item.phones[0] }}
          <span v-if="item.phones.length > 1" style="margin: 0 32px 0 50px;"><strong>ещё {{ item.phones.length-1 }}</strong></span>
        </div>
        <details class="custom-details">
          <summary></summary>
          <ul>
            <li v-for="(phone, pIndex) in item.phones.slice(1)" :key="pIndex">{{ phone }}</li>
          </ul>
        </details>
      </div>
    </TabularTableRowCell>

    <!-- Номера -->
    <TabularTableRowCell>
  <div v-if="item.plates.length <= 1">
    {{ item.plates[0] }}
  </div>
  <div v-else>
    <div>{{ item.plates[0] }}
      <span v-if="item.plates.length > 1" style="margin: 0 32px 0 50px;"><strong>ещё {{ item.plates.length-1 }}</strong></span>
    </div>
    <details class="custom-details">
      <summary></summary>
      <ul>
        <li v-for="(plate, plIndex) in item.plates.slice(1)" :key="plIndex">{{ plate }}</li>
      </ul>
    </details>
  </div>
</TabularTableRowCell>
  </TabularTableRow>
  <TabularTableRow v-else class="h-[50vh]">
				<FiltersNoData></FiltersNoData>
			</TabularTableRow>
    </template>

  </DirectorReportComponent>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import ModalBoolean from '@/components/ModalBoolean.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';
import FiltersNoData from '@/components/Tabular/FiltersNoData.vue';
import { convertToPhoneCarTableFormat }  from '@/api/sendFunctions/phones.js'

//import TabularSection from '@/components/Tabular/TabularSection.vue';
//import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue';
//import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
import deleteCustomerRecord from '@/api/director/directorApiDeleteCustomerRecord';

import '@vuepic/vue-datepicker/dist/main.css';
import DirectorReportComponent from '@/components/DirectorReportComponent.vue';
import TableHeaders from '@/components/Tabular/TableHeaders.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';
import TabularTable from '@/components/Tabular/TabularTable.vue';

import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import isEnv from '@/utils/isEnv.js';

import { unixToDatePeriodHeader, getUnixToday } from '@/utils/time/dateUtils.js';
// const ApiCall = isEnv('sadmin') ? sadminApiGetCustomerRecords : directorApiGetCustomerRecords
const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
const serviceStationsStore = useSadminServiceStationsStore();
const displayedItems = ref([]);
const selectedCarCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к serviceStationsStore
      return isEnv('sadmin') 
        ? [serviceStationsStore?.getSelectedServiceStation().id]
        : null;
    });

const CELL_HEIGHT = '90%';
const CELL_WIDTH= '100%';

const columns = ref([
    { header: 'Телефон', size: '3fr' },
      { header: 'Автомобиль', size: '7fr' },
      { header: '', size: '30px' },
    ]);


async function deleteItem(item) {
    const isConfirmed = confirm('Вы уверены, что хотите удалить этот элемент?');
    if (!isConfirmed) {
        return; // Если пользователь отказался, прерываем выполнение функции
    }

    try {
        // Вызываем функцию удаления и передаём orderId
        await deleteCustomerRecord(item.orderId);
        // Удаляем элемент из списка
        items.value = items.value.filter(i => i.orderId !== item.orderId);
    } catch (error) {
        console.error('Ошибка при удалении элемента:', error);
    }
}

onMounted(applyFilters);





let filterDateStart = ref(getUnixToday());
let filterPeriod = ref('month');

function updateFilters(data) {
  filterDateStart.value = data.dateStart;
  filterPeriod.value = data.period
}

const items = ref([]);
const filters = ref({
  interval: filterPeriod.value,
  dateStart: filterDateStart.value,
  works: null,
  carCenters: selectedCarCenterIds.value,
  page: 1
});

async function resetToDefaultFilters() {
  try {
    let __tempDateStart = filterDateStart.value;
    let __tempPeriod = filterPeriod.value;
    // значения по умолчанию для filterDateStart и filterPeriod
    filterDateStart.value = getUnixToday(); // Значение по умолчанию для даты
    filterPeriod.value = 'month'; // Значение по умолчанию для периода
    

    // Применяем фильтры
    await applyFilters();
    filterDateStart.value = __tempDateStart;
    filterPeriod.value = __tempPeriod;
  } catch (error) {
    console.error('Error applying default filters:', error);
  }
}
async function applyFilters() {
  try {
    console.log(filters.value);
    const response = await apiClient.post('/report/get-suspicious-phones', {filters: filters.value} );
    
    displayedItems.value = response.data.items;
    //console.log(response);
    console.log(displayedItems.value);
  } catch (error) {
    console.error('Error applying filters:', error);
  }
}
async function onSave(){
  let title = `Подозрительная привязка телефонов и автомобилей ${ unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value) }`
  let tableData = convertToPhoneCarTableFormat(title,displayedItems.value)
  console.log(tableData);
  const saveResponse = await apiClient.post('/report-save',tableData);
  console.log(saveResponse);
}
async function onSend(){

  let title = `Подозрительная привязка телефонов и автомобилей ${ unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value) }`
  let tableData = convertToPhoneCarTableFormat(title,displayedItems.value)
  console.log(tableData);
  const saveResponse = await apiClient.post('/report-emails',tableData);
  console.log(saveResponse);
}
</script>
<script>
export default {
  data() {
    return {
      displayedItemss: ref([
        {
          "phones": [
            "+79555555555"
          ],
          "plates": [
            "AA222A 86",
            "AA333A 86",
            "AA444A 186",
            "AA555A 86"
          ]
        },
        {
          "plates": [
            "AA222A 86"
          ],
          "phones": [
            "+79222222222",
            "+79333333333",
            "+79444444444",
            "+79555555555"
          ]
        }
      ])
    };
  },
  methods: {
    toggleDetails(item) {
      item.detailsOpen = !item.detailsOpen;
    }
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
