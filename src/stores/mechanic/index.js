import MechanicAuth from '@/views/Mechanic/MechanicAuth/MechanicAuthView.vue'
import MechanicHumanSelect from '@/views/Mechanic/MechanicHumanSelect/MechanicHumanSelectView.vue'
import MechanicOrder from '@/views/Mechanic/MechanicOrder/MechanicOrderView.vue'
import MechanicOrderWorkAdd from '@/views/Mechanic/MechanicOrderWorkAdd/MechanicOrderWorkAddView.vue'
import MechanicPaymentQr from '@/views/Mechanic/MechanicPaymentQr/MechanicPaymentQrView.vue'

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
  }
]
