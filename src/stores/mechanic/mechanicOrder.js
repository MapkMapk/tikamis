import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { mechanicApiClient } from '@/api/mechanicApiClient.js'

export const useMechanicOrderStore = defineStore('mechanicOrder', () => {
  let orderId = ref()
  let plateNumber = ref('')
  let startTime = ref('')
  let startDate = ref('')
  let completionTimeHours = ref()
  let works = ref()

  async function getNext() {
    const { data } = await mechanicApiClient.get(`/order/get-next`)
    orderId.value = data.orderId
    plateNumber.value = data.plateNumber
    startTime.value = data.startTime
    startDate.value = data.startDate
    completionTimeHours.value = data.completionTimeHours
    works.value = data.works
  }

  let formattedCompletionTime = computed(() => {
    let time = String(completionTimeHours.value).split('.')
    if (time.length === 2) {
      let hoursString = ''
      let minutesString = ''
      if (Number(time[0]) !== 0) {
        hoursString = `${time[0]} ч `
      }
      minutesString = `${60 * (time[1] / (10 + '0'.repeat(time[1].length - 1)))} мин`
      if (hoursString === '') {
        minutesString = '-' + minutesString
      }
      return hoursString + minutesString
    }
    return null
  })

  async function removeWork(workId) {
    const response = await mechanicApiClient.delete('/order/work', {
      data: {
        orderId: orderId.value,
        workId: workId
      }
    })
    console.log(response)
    await getNext()
    // for (let i = 0; i < works.value.length; i++) {
    //   if (works.value[i].id === id) {
    //     works.value.splice(i, 1)
    //   }
    // }
  }

  async function nextOrder() {
    await mechanicApiClient.post('order/cancel', { orderId: orderId.value })
    await getNext()
  }

  return {
    orderId,
    plateNumber,
    startTime,
    startDate,
    completionTimeHours,
    works,
    formattedCompletionTime,
    getNext,
    removeWork,
    nextOrder
  }
})
