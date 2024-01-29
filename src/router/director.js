import AuthView from '@/views/Shared/SharedAuth/SharedAuthView.vue';
import ManageSettingsView from '@/views/Shared/SharedManageSerttings/SharedManageSettingsView.vue';
import ReportPostsDowntimeView from '@/views/Shared/_Tabular/TabularReportPostsDowntime/TabularReportPostsDowntimeView.vue';
import ReportCanceledWorksView from '@/views/Shared/_Tabular/TabularReportCanceledWorks/TabularReportCanceledWorksView.vue';
import ReportAddedWorksView from '@/views/Shared/_Tabular/TabularReportAddedWorks/TabularReportAddedWorksView.vue';
import ReportCustomerSkipsView from '@/views/Shared/_Tabular/TabularReportCustomerSkipsView/TabularReportCustomerSkipsView.vue';
import { useDirectorUserStore } from '@/stores/director/directorUser.js';

const directorRoutes = {
  path: '/director',
  children: [
    {
      path: 'auth',
      name: 'director.auth',
      component: AuthView,
      meta: { title: 'Аутентификация | Директор | Tikamis' },
      props: { title: 'Панель директора' }
    },
    {
      path: 'manage/settings',
      name: 'director.manage.settings',
      component: ManageSettingsView,
      meta: { title: 'Настройки | Директор' }
    },
    {
      path: 'report/posts-downtime',
      name: 'director.report.posts-downtime',
      component: ReportPostsDowntimeView,
      meta: { title: 'Простои постов | Директор | Tikamis' }
    },
    {
      path: 'report/canceled-works',
      name: 'director.report.canceled-works',
      component: ReportCanceledWorksView,
      meta: { title: 'Заказанные, но не выполненные работы | Директор | Tikamis' }
    },
    {
      path: 'report/added-works',
      name: 'director.report.added-works',
      component: ReportAddedWorksView
    },
    {
      path: 'report/customer-skips',
      name: 'director.report.customer-skips',
      component: ReportCustomerSkipsView
    },
    {
      path: 'analytics/posts-kpd',
      name: 'director.analytics.posts-kpd,'
    },
    {
      path: 'analytics/order-history',
      name: 'director.analytics.order-history,'
    },
    {
      path: 'report/plate-fakes',
      name: 'director.report.plate-fakes'
    },
    {
      path: 'report/suspicious',
      name: 'director.report.suspicious'
    },
    // 404 LAST
    {
      path: ':pathMatch(.*)*',
      redirect: 'director/auth',
    }
  ]
};

function directorBeforeEach(to) {
  const directorUserStore = useDirectorUserStore();

  if (!directorUserStore.accessToken) {
    if (to.path === '/director/auth') {
      return true;
    } else {
      return '/director/auth';
    }
  }

  if (directorUserStore.accessToken) {
    if (to.path === '/director/auth' && directorUserStore.accessToken) {
      return '/director/manage/settings';
    } else {
      return true;
    }
  }

  return true;
}

export { directorRoutes, directorBeforeEach };
