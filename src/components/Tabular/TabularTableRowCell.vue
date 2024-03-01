<template>
    <div class="tabular-cell">
      <slot />
    </div>
  </template>
  
  <style scoped>
  .tabular-cell {
    /* Стили для ячейки таблицы */
    height: calc(100% + 50px); /* Для числовой высоты ячейки */
    font-size: 18px;
    padding: 16px 0;
  }
  </style>