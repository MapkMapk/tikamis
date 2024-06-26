<template>
	<ModalBoolean @callback="modal.callback" :is-visible="modal.isVisible" :primary-button-component="modal.color"
		:primary-count-text="modal.primaryCountText" :main-title="modal.mainTitle" :main-text="modal.mainText"
		:primary-button-text="modal.primaryButtonText" :secondary-button-text="modal.secondaryButtonText" />
	<div>
		<!-- Модальное окно для подтверждения действия -->

		<!-- Главный заголовок страницы -->
		<MainHeader />
		<!-- Промежуток для главного заголовка -->
		<MainHeaderGap />
		<!-- Секция с табличными данными -->
		<TabularSection>
			<!-- Заголовок для таблицы -->
			<TabularPrimeTitle class="mb-2">Записи клиентов</TabularPrimeTitle>
			<!-- Обертка для фильтров таблицы -->
			<TabularFiltersWrapper>
				<!-- Фильтр по периоду -->
				<TabularFilterPeriod @updatePeriod="selectOptionHandler" style="flex: 184;" />
				<!-- Фильтр по дате -->
				<TabularFilterDate @updateDate="selectDateHandler" style="flex: 614;" />
				<!-- Кнопка сброса фильтров -->
				<TabularButtonCross style="flex: 60; cursor: pointer;" @click="resetToDefaultFilters" />
				<!-- Кнопка применения фильтров -->
				<TabularButtonApplyFilters style="flex: 217;" @click="applyFilters" />
			</TabularFiltersWrapper>
		</TabularSection>
		<!-- Таблица с данными -->
		<TabularTable style="display: block; padding: 30px;">
			<!-- Заголовки столбцов -->
			<TabularTableRow style="display: grid; grid-template-columns: 2.2fr 1fr 1fr 1fr 0.2fr;">
				<TabularTableCellTop style="padding-left: 10px;">Работы</TabularTableCellTop>
				<TabularTableCellTop style="padding-left: 10px;">Время записи</TabularTableCellTop>
				<TabularTableCellTop style="padding-left: 10px;">Телефон</TabularTableCellTop>
				<TabularTableCellTop style="padding-left: 10px;">Автомобиль</TabularTableCellTop>
				<TabularTableCellTop></TabularTableCellTop>
			</TabularTableRow>
			<!-- Ряды данных -->
			<TabularTableRow v-for="item in items" :key="item.orderId"
				style="display: grid; grid-template-columns: 2.2fr 1fr 1fr 1fr 0.2fr;">
				<!-- Ячейка с данными о работах -->
				<TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '2.2fr' }" style="padding-left: 10px;">
					{{ item.works.length === 1 ? item.works[0].name : '' }}
					<details v-if="item.works.length > 1" class="custom-details" :style="{ width: CELL_WIDTH }">
						<summary class="flex" style="justify-content: space-between;"> {{ item.works[0].name }}
							<strong>ещё {{ item.works.length - 1 }}</strong> </summary>
						<ul>
							<li v-for="work in item.works.slice(1)" :key="work.id">{{ work.name }}</li>
						</ul>
					</details>
				</TabularTableRowCell>
				<!-- Ячейка с данными о времени записи -->
				<TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '1fr' }"
					style="padding-left: 10px; align-self: center;">{{ unixToData(item.bookingTime) }}
				</TabularTableRowCell>
				<!-- Ячейка с данными о телефоне -->
				<TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '1fr' }"
					style="padding-left: 10px; align-self: center;">{{ item.phone }}</TabularTableRowCell>
				<!-- Ячейка с данными об автомобиле -->
				<TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '1fr' }"
					style="padding-left: 10px; align-self: center;">{{ item.plate }}</TabularTableRowCell>
				<!-- Ячейка для действий -->
				<TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '.2fr' }">
					<!-- Кликабельное изображение крестика для удаления записи deleteItem(item)-->
					<svg @click="deleteModal()" style="cursor: pointer;" class="delete-icon"
						xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
						viewBox="0 0 16 16">
						<path
							d="M14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292894 15.7071C-0.0976312 15.3166 -0.0976312 14.6834 0.292894 14.2929L6.58579 8L0.292894 1.70711C-0.0976306 1.31658 -0.0976306 0.683417 0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893Z"
							fill="#A1A4AD" />
					</svg>
				</TabularTableRowCell>
			</TabularTableRow>
		</TabularTable>
	</div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';

import MainHeader from '@/components/MainHeader.vue';
import ModalBoolean from '@/components/ModalBoolean.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import BaseButtonFilledRed from '@/components/BaseButtonFilledRed.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import directorApiGetCustomerRecords from '@/api/director/directorApiGetCustomerRecords.js';
import sadminApiGetCustomerRecords from '@/api/sadmin/sadminApiGetCustomerRecords.js'
import isEnv from '@/utils/isEnv.js';

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
import { directorApiClient } from '@/api/directorApiClient';
import { sadminApiClient } from '@/api/sadminApiClient';
const sadminServiceStationsStore = useSadminServiceStationsStore();
const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;

const selectedCarCenterIds = computed(() => {
	return isEnv('sadmin')
		? [sadminServiceStationsStore?.getSelectedServiceStation().id]
		: null;
});
console.log(selectedCarCenterIds.value);
let modal = ref({});

function deleteModal() {

	modal.value.callback = save;
	modal.value.color = BaseButtonFilledRed;
	modal.value.primaryButtonText = `Удалить`;
	modal.value.isVisible = true;
	modal.value.mainTitle = 'Удалить запись клиента?';

	//modal.value.primaryButtonText = 'Продолжить';
	modal.value.secondaryButtonText = 'Отмена';

	async function save() {
		// Sadmin
		modal.value.isVisible = false;
	}
}








const CELL_HEIGHT = '90%';
const CELL_WIDTH = '100%';

function toggleDetails(event) {
	// Проверяем, что клик был не по самому элементу <summary>,
	// чтобы избежать конфликта с его стандартным поведением.
	if (event.target.tagName !== 'SUMMARY') {
		const detailsElements = event.currentTarget.querySelectorAll('details');
		detailsElements.forEach(details => {
			// Если details уже открыт, закрываем его, и наоборот.
			if (details.hasAttribute('open')) {
				details.removeAttribute('open');
			} else {
				details.setAttribute('open', '');
			}
		});
	}
}

function toggleSingleDetail(event) {
	toggleDetails(event);
	console.log(event)
}

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
	filterDateStart.value = (date + 86400);
	console.log(filterDateStart.value);
}

const items = ref([]);
const filters = ref({
	interval: filterPeriod,
	dateStart: filterDateStart,
	works: ['none'],
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
		console.error('Ошибка при применении фильтров по умолчанию:', error);
	}
}
async function applyFilters() {
	try {
		const apiClient = isEnv('sadmin') ? sadminApiGetCustomerRecords : directorApiGetCustomerRecords;
		const response = await apiClient(filters.value);

		items.value = response.items;
	} catch (error) {
		console.error('Ошибка при применении фильтров:', error);
	}
}

async function fetchData() {
	try {
		const apiClient = isEnv('sadmin') ? sadminApiGetCustomerRecords : directorApiGetCustomerRecords;
		const response = await apiClient(filters.value);
		items.value = response.items;
		console.log(items);
		console.log(items.value);
	} catch (error) {
		console.error('Ошибка при получении данных:', error);
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
	methods: {
		selectOptionHandler(option) {
			filterPeriod.value = option;
			console.log('Значение опции:', option);
		},
		dateChangeHandler(date) {
			// Обработка новой выбранной даты
		}
	},
	setup() {
		function dateSelectedHandler(selectedDate) {
			// Обновляем фильтры, передав выбранную дату
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

.custom-details {
	margin-right: 50px;
}

.custom-details[open] summary:after {
	transform: rotate(-90deg);
}

.report-table-row:nth-child(odd) {
	background-color: #f5f5f5;
}

.custom-details ul {
	padding-left: 0;
	/* Убираем стандартный отступ слева у списка */
	list-style-type: none;
	/* Убираем маркеры списка */
}

.custom-details li {
	display: block;
	/* Каждый элемент списка будет занимать всю ширину контейнера */
	text-align: left;
	/* Выравнивание текста по левому краю */
	padding: 4px 0;
	/* Добавляем немного отступа для каждого элемента списка */
}


/* Стили для выравнивания контента внутри details */

.custom-details summary {
	display: flex;
	/* Используем flexbox для выравнивания заголовка */
	justify-content: space-between;
	/* Распределяем пространство между элементами */
	align-items: center;
	/* Выравниваем элементы по центру по вертикали */
	padding: 4px 0;
	/* Добавляем немного отступа */
}
</style>