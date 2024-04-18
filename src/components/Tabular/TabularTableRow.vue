<template>
  <div 
    class="report-table-row" 
    style="display: grid;"
    @click="toggleAllDetails">
    <slot />
  </div>
</template>

<script>
import { defineProps } from 'vue';

const props = defineProps({
  rowWidth: {
    type: String,
    default: 'auto'
  }
});

export default {
  methods: {
    toggleAllDetails(event) {
      //console.log('toggleAllDetails вызван');

      // Получаем все элементы `details` внутри текущей TabularTableRow.
      const detailsElements = this.$el.querySelectorAll('details');
      //console.log(`Найдено ${detailsElements.length} элементов 'details'`);

      // Проверяем, открыты ли все `details`
      const allOpen = [...detailsElements].every(details => details.open);

      // Если все `details` открыты, закрываем их, иначе открываем
      if (allOpen) {
        this.closeAllDetails(detailsElements);
      } else {
        this.openAllDetails(detailsElements);
      }
    },

    closeAllDetails(detailsElements) {
      detailsElements.forEach((details) => {
        details.removeAttribute('open');
      });
    },

    openAllDetails(detailsElements) {
      detailsElements.forEach((details) => {
        details.setAttribute('open', true);
      });
    }
  }
};
</script>
  
  <style scoped>
  .report-table-row {
    display: grid;
    grid-template-rows: auto; /* Необходимо задать высоту ячеек */
  }
  </style>