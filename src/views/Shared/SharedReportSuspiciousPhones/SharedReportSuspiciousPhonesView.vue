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
      <TabularFilterPeriod :option-selected="handleOptionSelected" style="flex: 184;"/>
      <TabularFilterDate @updateDate="handleSelectedDate" style="flex: 614;"/>

      <TabularButtonCross style="flex: 60; cursor: pointer;" @click="defaultFilters" />
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
        <TabularTableRowCell :style="{ height: cellHeight, width: '2fr' }" style="padding-left: 10px;">
          <details class="custom-details" :style="{ width: cellWidth }">
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
        <TabularTableRowCell :style="{ height: cellHeight, width: '7fr' }" style="padding-left: 10px;padding-top: 20px;">Е739ХС 186</TabularTableRowCell>
        <TabularTableRowCell  :style="{ height: cellHeight, width: '1fr' }" style="padding-left: 10px;">
        <div style="display: flex;justify-content: flex-end; padding-right: 10px">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <i class="material-icons" @click="toggleDetails(item.orderId)">
          expand_less
          </i>
        </div>
      </TabularTableRowCell>
      </TabularTableRow>
      
      <TabularTableRow style="display: grid; grid-template-columns: 2fr 7fr 1fr;">
        <TabularTableRowCell :style="{ height: cellHeight, width: '2fr' }" style="padding-left: 10px;">
          <details class="custom-details" :style="{ width: cellWidth }">
            <summary class="flex" style="justify-content: space-between;">
              +79128529201 <strong style="padding-right: 10px;">ещё 2</strong>
        </summary>
        <ul>
          <li >+79128968113</li>
          <li >+79126380708</li>
        </ul>
          </details>
        </TabularTableRowCell>
        <TabularTableRowCell :style="{ height: cellHeight, width: '7fr' }" style="padding-left: 10px;padding-top: 20px;">В529УА 86</TabularTableRowCell>
      <TabularTableRowCell :style="{ height: cellHeight, width: '1fr' }" style="padding-left: 10px;">
        <div style="display: flex;justify-content: flex-end; padding-right: 10px">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <i class="material-icons">
            expand_less
          </i>
        </div>
      </TabularTableRowCell>
      </TabularTableRow>
      <TabularTableRow style="display: grid; grid-template-columns: 2fr 7fr 1fr;">
        <TabularTableRowCell :style="{ height: cellHeight, width: '2fr' }" style="padding-left: 10px;">
          <details class="custom-details" :style="{ width: cellWidth }">
            <summary class="flex" style="justify-content: space-between;">79126138243</summary>
          </details>
        </TabularTableRowCell>
        <TabularTableRowCell :style="{ height: cellHeight, width: '7fr' }" style="padding-left: 10px;padding-top: 20px;">Х446ОК 186</TabularTableRowCell>
      </TabularTableRow>
  <!-- <TabularTableRow v-for="item in items" :key="item.orderId" style="display: grid; grid-template-columns: 3fr 7fr 1fr;">
    <TabularTableRowCell :style="{ height: cellHeight, width: '2fr' }" style="padding-left: 10px;">
      {{ item.phones.length === 1 ? item.phones[0].name : '' }}
      <details v-if="item.phones.length > 1" class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;">
          {{ item.phones[0].name }} <strong>ещё {{ item.phones.length - 1 }}</strong>
        </summary>
        <ul>
          <li v-for="work in item.phones.slice(1)" :key="work.id">{{ work.name }}</li>
        </ul>
      </details>
    </TabularTableRowCell>
    <TabularTableRowCell :style="{ height: cellHeight, width: '2fr' }" style="padding-left: 10px;">
      {{ item.plates.length === 1 ? item.plates[0].name : '' }}
      <details v-if="item.plates.length > 1" class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;">
          {{ item.plates[0].name }} <strong>ещё {{ item.plates.length - 1 }}</strong>
        </summary>
        <ul>
          <li v-for="work in item.plates.slice(1)" :key="work.id">{{ work.name }}</li>
        </ul>
      </details>
    </TabularTableRowCell>
    <TabularTableRowCell :style="{ height: cellHeight, width: '.2fr' }" >
      
      <svg @click="deleteItem(item)" style="cursor: pointer;" class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
      <path d="M14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292894 15.7071C-0.0976312 15.3166 -0.0976312 14.6834 0.292894 14.2929L6.58579 8L0.292894 1.70711C-0.0976306 1.31658 -0.0976306 0.683417 0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893Z" fill="#A1A4AD"/>
      </svg>
    </TabularTableRowCell>
  </TabularTableRow> -->
  
</TabularTable>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import ModalBoolean from '@/components/ModalBoolean.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import directorApiGetCustomerRecords from '@/api/director/directorApiGetSuspiciousPhones.js';
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



const cellHeight = '90%';
const cellWidth = '100%';




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



</script>

<script>


let filterDateStart = ref(1675882800);
let filterDatePeriod = ref('year');

function handleSelectedDate(date) {
  console.log(date);
  filterDateStart.value = (date+86400);
  console.log(filterDateStart.value);
}

const items = ref([]);
const filters = ref({
  interval: filterDatePeriod,
  dateStart: filterDateStart,
  works: ['11111', '22222', '33333', '44444', '55555'],
  carCenters: ['C-1111'],
  page: 1
});

async function defaultFilters() {
  try {
    let __tempDateStart = filterDateStart.value;
    let __tempPeriod = filterDatePeriod.value;
    // значения по умолчанию для filterDateStart и filterDatePeriod
    filterDateStart.value = null; // Значение по умолчанию для даты
    filterDatePeriod.value = null; // Значение по умолчанию для периода
    

    // Применяем фильтры
    await applyFilters();
    filterDateStart.value = __tempDateStart;
    filterDatePeriod.value = __tempPeriod;
  } catch (error) {
    console.error('Error applying default filters:', error);
  }
}
async function applyFilters() {
  try {
    const response = await directorApiGetCustomerRecords(filters.value);
    
    items.value = response.items;
  } catch (error) {
    console.error('Error applying filters:', error);
  }
}

async function fetchData() {
  try {
    const response = await directorApiGetCustomerRecords(filters.value);
    items.value = response.items;
    console.log(items);
    console.log(items.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}



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
    handleOptionSelected(option){
      filterDatePeriod.value = option.value;
      console.log('Значение опции:', filterDatePeriod.value);
    },
    handleDateChange(date) {
      // Обработка новой выбранной даты
    }
  },
  setup() {
    function handleDateSelected(selectedDate) {
      // Обновите фильтры, передав выбранную дату
      filters.value.dateStart = selectedDate;
    }

    return {
      items,
      applyFilters,
      defaultFilters,
      handleDateSelected
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
