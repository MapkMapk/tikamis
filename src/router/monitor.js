import MonitorListView from '@/views/Monitor/MonitorListView.vue';
import MonitorServiceView from '@/views/Monitor/MonitorServiceView.vue';

const monitorRoutes = {
  path: '/monitor',
  children: [
    {
      path: '',
      name: 'monitor.list',
      component: MonitorListView,
      meta: { title: 'Список автосервисов' }
    },
    {
      path: 'service',
      name: 'monitor.service',
      component: MonitorServiceView,
      meta: { title: 'Детали автосервиса' }
    }
  ]
};

export { monitorRoutes };