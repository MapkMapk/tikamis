import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('order', () => {
  let orderId = ref(20000382)
  let plateNumber = ref('AA000A')
  let startTime = ref('13:20')
  let startDate = ref('26 октября, четверг')
  let completionTimeHours = ref(1.3)
  let works = [
    {
      'id': 'БП-874923',
      'name': 'Проверка тормозных шлангов'
    },
    {
      'id': 'БП-98091',
      'name': 'Замена масла'
    }
  ]

  return { orderId, plateNumber, startTime, startDate, completionTimeHours, works }
})