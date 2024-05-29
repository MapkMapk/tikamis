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
      <TabularPrimeTitle class="mb-2">Подозрительная привязка телефонов и автомобилей</TabularPrimeTitle>
      <TabularFiltersWrapper>
      <TabularFilterPeriod :option-selected="selectOptionHandler" style="flex: 184;"/>
      <TabularFilterDate @updateDate="selectDateHandler" style="flex: 614;"/>

      <TabularButtonCross style="flex: 60; cursor: pointer;" @click="resetToDefaultFilters" />
      <TabularButtonApplyFilters style="flex: 217;" @click="applyFilters" />
    </TabularFiltersWrapper>
    </TabularSection>

    <TabularTable style="display: block; padding: 30px;">
      <TabularTableRow style="display: grid; grid-template-columns: 2fr 7fr 1fr;">
        <TabularTableCellTop style="padding-left: 10px;">Телефон</TabularTableCellTop>
        <TabularTableCellTop style="padding-left: 10px;">Автомобиль</TabularTableCellTop>
        <TabularTableCellTop></TabularTableCellTop>
      </TabularTableRow>
      <TabularTableRow style="display: grid; grid-template-columns: 2fr 7fr 1fr;">
        <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '2fr' }" style="padding-left: 10px;">
          <details class="custom-details" :style="{ width: CELL_WIDTH}">
            <summary class="flex" style="justify-content: space-between;">
              +79123650840 <strong style="padding-right: 10px;">ещё 4</strong>
        </summary>
        <ul>
          <li >+79125014068</li>
          <li >+79122781025</li>
          <li >+79129496442</li>
          <li >+79120879283</li>
        </ul>
          </details>
        </TabularTableRowCell>
        <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '7fr' }" style="padding-left: 10px;padding-top: 20px;">Е739ХС 186</TabularTableRowCell>
        <TabularTableRowCell  :style="{ height: CELL_HEIGHT, width: '1fr' }" style="padding-left: 10px;">
        <div style="display: flex;justify-content: flex-end; padding-right: 10px">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <i class="material-icons" @click="toggleDetails(item.orderId)">
          expand_less
          </i>
        </div>
      </TabularTableRowCell>
      </TabularTableRow>
      
      <TabularTableRow style="display: grid; grid-template-columns: 2fr 7fr 1fr;">
        <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '2fr' }" style="padding-left: 10px;">
          <details class="custom-details" :style="{ width: CELL_WIDTH}">
            <summary class="flex" style="justify-content: space-between;">
              +79128529201 <strong style="padding-right: 10px;">ещё 2</strong>
        </summary>
        <ul>
          <li >+79128968113</li>
          <li >+79126380708</li>
        </ul>
          </details>
        </TabularTableRowCell>
        <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '7fr' }" style="padding-left: 10px;padding-top: 20px;">В529УА 86</TabularTableRowCell>
      <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '1fr' }" style="padding-left: 10px;">
        <div style="display: flex;justify-content: flex-end; padding-right: 10px">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <i class="material-icons">
            expand_less
          </i>
        </div>
      </TabularTableRowCell>
      </TabularTableRow>
      <TabularTableRow style="display: grid; grid-template-columns: 2fr 7fr 1fr;">
        <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '2fr' }" style="padding-left: 10px;">
          <details class="custom-details" :style="{ width: CELL_WIDTH}">
            <summary class="flex" style="justify-content: space-between;">79126138243</summary>
          </details>
        </TabularTableRowCell>
        <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '7fr' }" style="padding-left: 10px;padding-top: 20px;">Х446ОК 186</TabularTableRowCell>
      </TabularTableRow>
</TabularTable>
<div class="flex flex-col items-center">
            <div id="234" class="w-full flex mt-10 mb-3" style="justify-content: center">
              <div style="width: 400px;margin-right: 20px;">
              <BaseButtonFilledGreen
                class="flex flex-1 mr-5"
                style="width: inherit;"
                >Сохранить</BaseButtonFilledGreen
              >
            </div>
            <div style="width: 400px;margin-left: 20px">
              <BaseButtonFilledDark
                class="flex flex-1"
                style="width: inherit;"
                >Отправить</BaseButtonFilledDark
              >
            </div>
            </div>
          </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import ModalBoolean from '@/components/ModalBoolean.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import directorApiGetCustomerRecords from '@/api/director/directorApiGetSuspiciousPhones.js';
import sadminApiGetCustomerRecords from '@/api/sadmin/sadminApiGetCustomerRecords.js';
import unixToData from '@/utils/time/unixToData.js';

import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue';
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
import deleteCustomerRecord from '@/api/director/directorApiDeleteCustomerRecord';

import '@vuepic/vue-datepicker/dist/main.css';

import TabularTableCellTop from '@/components/Tabular/TabularTableCellTop.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';
import TabularTable from '@/components/Tabular/TabularTable.vue';

import TabularButtonCross from '@/components/Tabular/TabularButtonCross.vue';
import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue';

import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import isEnv from '@/utils/isEnv.js';
const ApiCall = isEnv('sadmin') ? sadminApiGetCustomerRecords : directorApiGetCustomerRecords
const serviceStationsStore = useSadminServiceStationsStore();

const selectedCarCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к serviceStationsStore
      return isEnv('sadmin') 
        ? [serviceStationsStore?.getSelectedServiceStation().id]
        : 'none';
    });

const CELL_HEIGHT = '90%';
const CELL_WIDTH= '100%';




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

onMounted(fetchData);





let filterDateStart = ref(1675882800);
let filterPeriod = ref('year');

function selectDateHandler(date) {
  console.log(date);
  filterDateStart.value = (date+86400);
  console.log(filterDateStart.value);
}

const items = ref([]);
const filters = ref({
  interval: filterPeriod,
  dateStart: filterDateStart,
  works: ['null'],
  carCenters: selectedCarCenterIds.value,
  page: 1
});

async function resetToDefaultFilters() {
  try {
    let __tempDateStart = filterDateStart.value;
    let __tempPeriod = filterPeriod.value;
    // значения по умолчанию для filterDateStart и filterPeriod
    filterDateStart.value = null; // Значение по умолчанию для даты
    filterPeriod.value = null; // Значение по умолчанию для периода
    

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
    const response = await ApiCall(filters.value);
    
    items.value = response.items;
  } catch (error) {
    console.error('Error applying filters:', error);
  }
}

async function fetchData() {
  try {
    const response = await ApiCall(filters.value);
    items.value = response.items;
    console.log(items);
    console.log(items.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

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
    selectOptionHandler(option){
      filterPeriod.value = option.value;
      console.log('Значение опции:', filterPeriod.value);
    },
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
      applyFilters,
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
