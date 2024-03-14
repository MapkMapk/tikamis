<template>
    <section
      v-if="isVisible"
      class="modal-overlay"
      @click="handleOverlayClick"
    >
      <div class="modal-window flex" @click.stop style="
        width: 240px;
        height: 240px;
        border: 3px;
        ">
        <div>
            <div class="modal-header">
            <!-- Иконка закрытия -->
            <div @click="closeModal" class="modal-close" style="text-align: end; opacity: 0;">✖</div>
            </div>
            <h1 class="modal-postNumber">Пост №{{ blockData.postNumber }}</h1>
            <!-- Заголовок модального окна, отображающий статус блока -->
            <div class="modal-textContainer">
                <h2>{{ blockTitles[blockData.type] || "Неизвестный статус" }}</h2>
                <!-- Условное отображение номера машины, если блок занят -->
                <p v-if="blockData.plate" style="text-align: start;">Номер машины: {{ blockData.plate }}</p>
                <!-- Отображение времени начала и окончания блока -->
                <p>с {{ formatTime(blockData.blockStart) }} по {{ formatTime(blockData.blockEnd) }}</p>
            </div>
            <div class="window-duration flex modal-timeContainer">
                <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" 
                    style="
                        margin-top: -2px;
                        margin-right: 10px;">
                <path d="M11 6C11 5.44772 10.5523 5 10 5C9.44771 5 9 5.44772 9 6V10C9 10.2652 9.10536 10.5196 9.29289 10.7071L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11 9.58579V6Z" fill="rgb(135 194 62)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="rgb(135 194 62)"/>
                </svg>
            <span class="modal-time">{{ calculateDuration(blockData.blockStart, blockData.blockEnd) }}</span>
            </div>
            
        </div>
        <div>
            <TabularButtonApplyFilters
            v-if="blockData.type === 'free'"
            @click="handleButtonClick"
            class="apply-button"
            style="height: 60px; width: 240px;"
            >
            Записать
            </TabularButtonApplyFilters>
        </div>
      </div>
    </section>
  </template>
<script setup>
import { defineProps, defineEmits } from 'vue';
  import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue'

  const emit = defineEmits(['close', 'submit', 'close-modal']);
  const { isVisible, blockData } = defineProps({
    isVisible: Boolean,
    blockData: Object
  });
  
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
  
  function calculateDuration(start, end) {
    const duration = end - start;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} ч ${minutes} мин`;
  }
  
  function handleButtonClick() {
    emit('submit', blockData); // Вы можете передать весь объект blockData или только конкретные данные
  }


    function closeModal() {
    emit('close-modal');
    }

    function handleOverlayClick() {
    closeModal();
    }
    const blockTitles = {
    free: 'Свободно для записи',
    busy: 'Время уже занято',
    short: 'Короткий промежуток',
    };
</script>
<style scoped>
.modal-overlay {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-window {
    background: white;
    border: 3px solid #0808084D;
    flex-direction: column;
    justify-content: space-between;
  }
  .modal-textContainer{
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: flex-start;
    margin: 20px 30px;
}
  .modal-window p{
    font-family: Inter;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: center;
  }
  .modal-postNumber, .modal-timeContainer{
    font-family: Inter;
    font-size: 30px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: center;
    margin-top: 7%;
}
.modal-timeContainer{
justify-content: center;
margin-bottom: 20px;
}
</style>