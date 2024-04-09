<!-- eslint-disable vue/no-mutating-props -->
<template>
    <section
      v-if="props.isVisible"
      class="z-50 flex justify-center items-center fixed  w-full h-screen left-0 top-0 bg-gray-848484"
    >
    <div class="flex flex-col justify-start items-start bg-white w-[1133px] h-[971px]">
        <div class="ml-[30px] w-[1103px] mtForAnyone">
        <!-- Заголовок -->
            <div class="flex justify-start w-full">
                <h1>Новый заказ — Пост №{{ props.postNumber }}</h1>
            </div>
        <!-- Дата и время записи -->
            <div class="flex justify-start w-full h-[100px]">
                <!-- Дата записи -->
                    <div>
                        <p class="mb-[10px]">Дата записи</p>
                        <TabularFilterDate :isVisible="false" @updateDate="handleSelectedDate"/>
                    </div>
                <!-- Время записи -->
                    <div class="ml-[30px]">
                        <p class="mb-[10px]">Время записи</p>
                        <input
                        :value="orderTime"
                        type="string"
                        class="base-input text-2xl w-[250px]"
                        />
                    </div>
            </div>
        <!-- Временные окна -->
            <div class="flex w-full">
                <!-- Время для услуг -->
                    <div class="flex flex-col w-[25%]">
                        <p class="mb-[10px]">Время для услуг:</p>
                        <div class="flex items-center w-[222px] h-[60px] px-[20px] bg-green orderTimeTypography">1 ч 20 мин</div>
                    </div>
                <!-- Свободно для записи -->
                    <div class="flex flex-col w-[75%]">
                        <p class="mb-[10px]">Свободно для записи:</p>
                        <div class="freeTimeWindows flex flex-wrap gap-[10px]">
                            <div class="flex items-center w-[250px] h-[60px] px-[20px] bg-gray-f5f5f5 orderTimeFreeTypography">10:00-13:30</div>
                            <div class="flex items-center w-[250px] h-[60px] px-[20px] bg-gray-f5f5f5 orderTimeFreeTypography">14:00-16:30</div>
                            <div class="flex items-center w-[250px] h-[60px] px-[20px] bg-gray-f5f5f5 orderTimeFreeTypography">18:00-20:00</div>
                            <div class="flex items-center w-[250px] h-[60px] px-[20px] bg-gray-f5f5f5 orderTimeFreeTypography">21:00-22:30</div>
                        </div>
                    </div>
            </div>
        <!-- Информация по автомобилю -->
            <div class="flex w-full">
            <!-- Телефон клиента -->
                <div>
                    <p class="mb-[10px]">Телефон клиента</p>
                    <input
                        :value="clientsPhone"
                        type="string"
                        class="base-input text-2xl w-[250px]"
                    />
                </div>
            <!-- Номер автомобиля -->
                <div class="ml-[30px]">
                    <p class="mb-[10px]">Номер автомобиля</p>
                    <input
                        :value="clientsCar"
                        type="string"
                        class="base-input text-2xl w-[250px]"
                    />
                </div>
            </div>
        <!-- Список услуг  -->
            <div class="flex flex-col w-full pr-[30px] mb-[60px]">
                <div class="workListHeader h-[53px] flex items-center">
                    <p>Список услуг</p>
                </div>
                <div class="workList flex justify-between items-center h-[80px]">
                    <p>Замена масла</p>
                    <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 3.75H1.25C0.559644 3.75 0 4.30964 0 5C0 5.69036 0.559644 6.25 1.25 6.25H1.4056L3.47169 21.7456C3.72009 23.6086 5.30928 25 7.18879 25H15.3112C17.1907 25 18.7799 23.6086 19.0283 21.7456L21.0944 6.25H21.25C21.9404 6.25 22.5 5.69036 22.5 5C22.5 4.30964 21.9404 3.75 21.25 3.75H16.25C16.25 1.67893 14.5711 0 12.5 0H10C7.92893 0 6.25 1.67893 6.25 3.75ZM8.75 3.75C8.75 3.05964 9.30964 2.5 10 2.5H12.5C13.1904 2.5 13.75 3.05964 13.75 3.75H8.75ZM5.94976 21.4152L3.92773 6.25H18.5723L16.5502 21.4152C16.4674 22.0362 15.9377 22.5 15.3112 22.5H7.18879C6.56229 22.5 6.03256 22.0362 5.94976 21.4152Z" fill="#080808"/>
                        <rect x="8" y="10" width="2.3" height="9" fill="#080808"/>
                        <rect x="12" y="10" width="2.3" height="9" fill="#080808"/>
                        </svg>
                </div>
                <div class="workList flex justify-between items-center h-[80px]">
                    <p>Проверка тормозных шлангов</p>
                    <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 3.75H1.25C0.559644 3.75 0 4.30964 0 5C0 5.69036 0.559644 6.25 1.25 6.25H1.4056L3.47169 21.7456C3.72009 23.6086 5.30928 25 7.18879 25H15.3112C17.1907 25 18.7799 23.6086 19.0283 21.7456L21.0944 6.25H21.25C21.9404 6.25 22.5 5.69036 22.5 5C22.5 4.30964 21.9404 3.75 21.25 3.75H16.25C16.25 1.67893 14.5711 0 12.5 0H10C7.92893 0 6.25 1.67893 6.25 3.75ZM8.75 3.75C8.75 3.05964 9.30964 2.5 10 2.5H12.5C13.1904 2.5 13.75 3.05964 13.75 3.75H8.75ZM5.94976 21.4152L3.92773 6.25H18.5723L16.5502 21.4152C16.4674 22.0362 15.9377 22.5 15.3112 22.5H7.18879C6.56229 22.5 6.03256 22.0362 5.94976 21.4152Z" fill="#080808"/>
                        <rect x="8" y="10" width="2.3" height="9" fill="#080808"/>
                        <rect x="12" y="10" width="2.3" height="9" fill="#080808"/>
                        </svg>
                </div>
            </div>

        </div>
    <!-- Кнопочки -->
        <div class="flex w-full">
            <BaseButtonFilledAdd
                @click="emit('callback', false)"
                class="flex-1 w-[337px] ml-[30px]"
                >
                Добавить услугу
            </BaseButtonFilledAdd>
            <BaseButtonFilledGreen
                @click="emit('callback', false)"
                class="flex-1 w-[337px] ml-[30px]"
                >
                Создать заказ
            </BaseButtonFilledGreen>
            <BaseButtonFilledLight
                @click="emit('close', false)"
                class="flex-1 w-[337px] ml-[30px] mr-[30px]"
                >
                Отмена
            </BaseButtonFilledLight>
        </div>
        
        <!-- <div class="flex flex-col items-center mt-[70px] mb-[60px] pl-10 pr-10 text-center">
          <span class="font-medium text-3xl">{{ props.mainTitle }}</span>
          <span class="text-lg mt-6 leading-7">{{ props.mainText }}</span>
        </div>
        <div class="flex w-full mt-auto">
          <component
            :is="primaryButtonComponent"
            @click="emit('callback', true)"
            class="flex-1"
          >
            {{ props.primaryButtonText }}
          </component>
          <BaseButtonFilledLight
            @click="emit('callback', false)"
            class="flex-1"
            >{{ props.secondaryButtonText }}
          </BaseButtonFilledLight>
        </div> -->
      </div>
    </section>
  </template>

  <script setup>
  import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
  import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
  import BaseButtonFilledAdd from '@/components/BaseButtonFilledAdd.vue';
  import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
  let emit = defineEmits(['callback','close']);
//   let props = defineProps({
//     isVisible: Boolean,
//     mainTitle: String,
//     mainText: String,
//     primaryButtonComponent: Object,
//     primaryButtonText: String,
//     secondaryButtonText: String
//   });
    let props = defineProps({
        isVisible: {
            type: Boolean,
            default: true // Значение по умолчанию для isVisible
        },
        postNumber: {
            type: Number,
            default: 1 // Значение по умолчанию для isVisible
        },
        clientsPhone: {
            type: String,
            default: '+79123436465'
        },
        clientsCar: {
            type: String,
            default: 'М393ВХ 86'
        },
        orderTime: {
            type: String,
            default: '10:00'
        }
    });
  </script>
  <style>
h1{
    font-family: Inter;
    font-size: 36px;
    font-weight: 500;
    line-height: 43.57px;
    text-align: left;
}
p{
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    line-height: 21.78px;
    text-align: left;
}
.mtForAnyone {margin-top: 10px}
.mtForAnyone > div{margin-top: 30px}
.orderTimeTypography{
    font-family: Inter;
    font-size: 36px;
    font-weight: 400;
    line-height: 50.4px;
    text-align: left;
    color: #FFFFFF;
}
.orderTimeFreeTypography{
    font-family: Inter;
    font-size: 36px;
    font-weight: 400;
    line-height: 50.4px;
    text-align: left;
    color: #080808;

}
.workListHeader{
    border: 1px solid #A1A4AD;background: #F5F5F5;
    padding: 0 20px;
}
.workListHeader p{
    font-family: Inter;
    font-size: 18px;
    font-weight: 400;
    line-height: 21.78px;
    text-align: left;
    color: #A1A4AD;

}
.workList {
    border: 1px solid #A1A4AD; /* Устанавливаем толщину, стиль и цвет границы */
    border-top: none; /* Убираем верхнюю границу */
    background: white;
    padding: 0 20px;
}
.workList p {
    font-family: Inter;
    font-size: 24px;
    font-weight: 400;
    line-height: 29.05px;
    text-align: left;
    color: #080808;
}
</style>