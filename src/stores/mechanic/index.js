import MechanicAuth from '@/pages/Mechanic/MechanicAuth/MechanicAuth.vue'
import MechanicHumanSelect from '@/pages/Mechanic/MechanicHumanSelect/MechanicHumanSelect.vue'
import MechanicOrder from '@/pages/Mechanic/MechanicOrder/MechanicOrder.vue'
import MechanicOrderWorkAdd from '@/pages/Mechanic/MechanicOrder/MechanicOrderWorkAdd/MechanicOrderWorkAdd.vue'
import MechanicPaymentQr from '@/pages/Mechanic/MechanicPaymentQr/MechanicPaymentQr.vue'

export default [
  {
    path: '/mechanic/auth',
    name: 'mechanic.auth',
    component: MechanicAuth
  },
  {
    path: '/mechanic/human-select',
    name: 'mechanic.humanSelect',
    component: MechanicHumanSelect
  },
  {
    path: '/mechanic/order',
    name: 'mechanic.order',
    component: MechanicOrder
  },
  {
    path: '/mechanic/order/work-add',
    name: 'mechanic.order.workAdd',
    component: MechanicOrderWorkAdd
  },
  {
    path: '/mechanic/payment-qr',
    name: 'mechanic.paymentQr',
    component: MechanicPaymentQr
  },
]