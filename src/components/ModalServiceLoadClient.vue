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
              <BaseSvgIcon name="clock" class="w-6 h-6 mr-[10px]" />
            <span class="modal-time">{{ calculateDuration(blockData.blockStart, blockData.blockEnd) }}</span>
            </div>
            
        </div>
        <div>
            <BaseButtonFilledGreen
            v-if="blockData.type !== 'busy'"
            @click="handleButtonClick"
            class="apply-button"
            style="height: 60px; width: 240px;"
            :style="{
             backgroundColor: blockData.type === 'short' ? '#cccccc' : ''
            }"
            >
            Записать
            </BaseButtonFilledGreen>
        </div>
      </div>
    </section>
  </template>
<script setup>
import { defineProps, defineEmits } from 'vue';
  import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue'
  import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
  const emit = defineEmits(['close', 'submit', 'close-modal']);
  const { isVisible, blockData, orderMinutes, freeBlocks } = defineProps({
  isVisible: Boolean,
  blockData: Object,
  orderMinutes: Number,
  freeBlocks: Array,
});
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    console.log(blockData)
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
  
  function calculateDuration(start, end) {
    const duration = end - start;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} ч ${minutes} мин`;
  }
  
  function handleButtonClick() {
    if (blockData.type === 'free'){
      emit('submit', {blockData, orderMinutes, freeBlocks}); // Вы можете передать весь объект blockData или только конкретные данные
    }
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