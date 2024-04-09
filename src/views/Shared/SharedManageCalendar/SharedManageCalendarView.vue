<template>
  <ModalBooleanGray
  @callback="grayClose"
  :is-visible="gray.isVisible"
  />
  <ModalBoolean
    @callback="modal.callback"
    :is-visible="modal.isVisible"
    :primary-button-component="modal.color"
    :primary-count-text="modal.primaryCountText"
    :main-title="modal.mainTitle"
    :main-text="modal.mainText"
    :primary-button-text="modal.primaryButtonText"
    :secondary-button-text="modal.secondaryButtonText"
  />
  <div>
    
    <MainHeader />
    <MainHeaderGap />

    <TabularSection>
      <div class="flex w-full" style="align-items: center; justify-content: center; margin-bottom: 40px;">
      <TabularPrimeTitle class="mb-2">Календарь рабочих смен</TabularPrimeTitle>
      <select v-model="selectedMonth" placeholder="Июнь-2023" class="text-4xl font-medium text-center mt-[39px] mb-[26px] mb-2" 
        style="
        border: 1px solid #A1A4AD;
        padding: 0 10px;
        margin-left: 10px;
      ">
        <option value="2023-06" selected >Июнь-2023</option>
      </select>
      <!-- <TabularFilterDate @updateDate="handleSelectedDateFirst" style="flex: 307;"/> -->
      </div>
      <div id="nusdfdsfll" class="flex flex-1 relative w-full" style="align-items: center;">
        <div 
          v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" 
          :key="day" 
          class="empty-cell flex-half border border-gray-d9d9d9 nusdfdsfll" 
          :style="{ width: '14.285%', height: computedHeight + 'px', background: '#F5F5F5' }">
          <p>{{ day }}</p>
        </div>
      </div>

      <!-- Рендер каждой строки таблицы  -->
      <div 
        v-for="(parent, parentIndex) in parentDivs"  
        :key="`parent-${parentIndex}`" 
        class="flex flex-1 relative w-full"
        style="align-items: center;"
      >
        <!-- Внутренний цикл для ячеек постов внутри каждой строки -->
        <div
          v-for="(child, childIndex) in parent.children"
          :key="`child-${childIndex}`"
          :id="`child-${parentIndex}-${childIndex}`"
          class="empty-cell white-cell flex-half border border-gray-d9d9d9"
          :class="{'clicked-cell': clickedCells[`child-${parentIndex}-${childIndex}`]}"
          @click="handleClick(`child-${parentIndex}-${childIndex}`)"
          @click.prevent="
          child && child.firstValue ? saveModal(child.firstValue, child.secondValue) : grayOpen()"
          :style="{ width: '14.285%', height: computedHeight + 'px', position: 'relative' }"
        >
          <!-- Условное отображение элемента <p> для firstValue, отображается только если child существует -->
          <p v-if="child" class="day-num" style="position: absolute; top: 10px; right: 20px;">{{ child.firstValue }}</p>
          <!-- Условное отображение элемента <p> для secondValue и thirdValue, отображается только если child существует -->
          <p v-if="child" class="posts-nonum" style="position: absolute; bottom: 10px; left: 20px;">
            <span class="posts-num">{{ child.secondValue }}</span> {{ child.thirdValue }}
          </p>
        </div>
      </div>

      <div class="flex w-full" style="margin-top: 20px;">
        <div class="flex" style="margin-right: 150px;"><div style="width: 30px; height: 30px; background-color: #C2C3C7; margin-right: 20px"></div><p>Нет работает, нет постов</p></div>
        <div class="flex" style="margin-right: 150px;"><div style="width: 30px; height: 30px; background-color: #87C23E; margin-right: 20px"></div><p>Изменено количество постов</p></div>
        <div v-if="isAnyCellClicked" class="flex"><div style="width: 30px; height: 30px; background-color: #E31E24; margin-right: 20px"></div><p>Добавлен выходной день</p></div>
      </div>
    </TabularSection>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';

import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';

import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
import BaseButtonFilledRed from '@/components/BaseButtonFilledRed.vue';
import ModalBoolean from '@/components/ModalBooleanGreen.vue';
import ModalBooleanGray from '@/components/ModalBooleanGray.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';

import '@vuepic/vue-datepicker/dist/main.css';

let modal = ref({});
let gray = ref({});

function grayOpen(){
gray.value.isVisible = true
}
function grayClose(){
gray.value.isVisible = false
}
function saveModal(uno,dos) {
  let isRed = event.target.classList.contains('clicked-cell');
  modal.value.callback = save;
  if(isRed){
    modal.value.color = BaseButtonFilledRed;
    modal.value.primaryButtonText = `Отменить выходной`;
    }
  else{
    modal.value.color = BaseButtonFilledDark;
    modal.value.primaryButtonText = `Установить выходной`;
  }
  modal.value.mainText = 'Количество постов';
  modal.value.primaryCountText = `${dos}`;
  modal.value.isVisible = true;
  modal.value.mainTitle = `${uno} июня`;
  
  //modal.value.primaryButtonText = 'Продолжить';
  modal.value.secondaryButtonText = 'Применить';
  async function save() {
    // Sadmin
    modal.value.isVisible = false;
  }
}

function closeModal() {
  modal.value.callback = close;
  modal.value.isVisible = true;
  modal.value.mainTitle = 'Закрыть без сохранения?';
  modal.value.mainText = 'Настройки не будут применены';
  modal.value.primaryButtonText = 'Сохранить изменения';
  modal.value.secondaryButtonText = 'Закрыть без сохранения';

  function close() {
    router.push('/');
  }
}





</script>
<script>
export default {
  setup() {
  },
  data() {
    return {
      computedHeight: 0, // начальное значение
      selectedMonth: "2023-06",
      clickedCells: {},
      parentDivs: [
  {
    "children": [
      null,
      null,
      null,
      {"firstValue": "1", "secondValue": 4, "thirdValue": "Поста"},
      {"firstValue": "2", "secondValue": 5, "thirdValue": "Постов"},
      {"firstValue": "3", "secondValue": 3, "thirdValue": "Поста"},
      {"firstValue": "4", "secondValue": 3, "thirdValue": "Поста"}
    ]
  },
  {
    "children": [
      {"firstValue": "5", "secondValue": 6, "thirdValue": "Постов"},
      {"firstValue": "6", "secondValue": 3, "thirdValue": "Поста"},
      {"firstValue": "7", "secondValue": 3, "thirdValue": "Поста"},
      {"firstValue": "8", "secondValue": 4, "thirdValue": "Поста"},
      {"firstValue": "9", "secondValue": 2, "thirdValue": "Поста"},
      {"firstValue": "10", "secondValue": 5, "thirdValue": "Постов"},
      {"firstValue": "11", "secondValue": 3, "thirdValue": "Поста"}
    ]
  },
  {
    "children": [
      {"firstValue": "12", "secondValue": 2, "thirdValue": "Поста"},
      {"firstValue": "13", "secondValue": 6, "thirdValue": "Постов"},
      {"firstValue": "14", "secondValue": 6, "thirdValue": "Постов"},
      {"firstValue": "15", "secondValue": 2, "thirdValue": "Поста"},
      {"firstValue": "16", "secondValue": 4, "thirdValue": "Поста"},
      {"firstValue": "17", "secondValue": 3, "thirdValue": "Поста"},
      {"firstValue": "18", "secondValue": 3, "thirdValue": "Поста"}
    ]
  },
  {
    "children": [
      {"firstValue": "19", "secondValue": 5, "thirdValue": "Постов"},
      {"firstValue": "20", "secondValue": 3, "thirdValue": "Поста"},
      {"firstValue": "21", "secondValue": 4, "thirdValue": "Поста"},
      {"firstValue": "22", "secondValue": 4, "thirdValue": "Поста"},
      {"firstValue": "23", "secondValue": 5, "thirdValue": "Постов"},
      {"firstValue": "24", "secondValue": 3, "thirdValue": "Поста"},
      {"firstValue": "25", "secondValue": 4, "thirdValue": "Поста"}
    ]
  },
  {
    "children": [
      {"firstValue": "26", "secondValue": 2, "thirdValue": "Поста"},
      {"firstValue": "27", "secondValue": 3, "thirdValue": "Поста"},
      {"firstValue": "28", "secondValue": 4, "thirdValue": "Поста"},
      {"firstValue": "29", "secondValue": 6, "thirdValue": "Постов"},
      {"firstValue": "30", "secondValue": 5, "thirdValue": "Постов"},
      {"firstValue": "31", "secondValue": 3, "thirdValue": "Поста"},
      null
    ]
  },
]
    };
  },
  computed: {
    // Вычисляемое свойство, проверяющее, есть ли нажатые ячейки
    isAnyCellClicked() {
      return Object.values(this.clickedCells).some(status => status);
    }
  },
  methods: {
    // Метод обрабатывает клик, изменяет состояние для конкретной ячейки
    handleClick(cellId) {
      this.clickedCells[cellId] = !this.clickedCells[cellId];
      this.$forceUpdate();
    }
  },
  mounted() {
    
    this.$nextTick(() => {
      // Предположим, что у вас есть элемент с классом 'empty-cell' для вычисления ширины
      const elementWidth = document.querySelector('.empty-cell').clientWidth;
      this.computedHeight = elementWidth * 0.4; // Высота равна половине ширины
    });
  },
};
</script>
<style>
.white-cell#child-1-0{
background-color: #C2C3C7;
box-shadow: inset 0 0 0 2px #fff;
}
.white-cell#child-1-0:hover{
  box-shadow: inset 0 0 0 2px #f00;
}
.white-cell#child-1-0 p,.white-cell#child-1-0 span {
color: #fff;}

.white-cell#child-1-2{
background-color: #87C23E;
box-shadow: inset 0 0 0 2px #fff;
}
.white-cell#child-1-2:hover{
  box-shadow: inset 0 0 0 2px #f00;
}
.white-cell#child-1-2 p,.white-cell#child-1-2 span {
color: #fff;}

.white-cell:hover{
  box-shadow: inset 0 0 0 2px #f00; /* Внутренний border красного цвета */
}
.white-cell{
padding: 15px 20px;
}

.day-num{
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  line-height: 24.2px;
  text-align: right;
  color: #080808;}
.posts-nonum{
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  text-align: left;

}
.posts-num{
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  line-height: 24.2px;
  text-align: left;
}

.nusdfdsfll{
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;}
#nusdfdsfll{
  font-family: Inter;
font-size: 24px;
font-weight: 500;
line-height: 29.05px;
text-align: center;
}
.clicked-cell {
  background-color: #E31E24; /* Цвет фона для активированных ячеек */
}
</style>