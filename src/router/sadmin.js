import AuthView from '@/views/Shared/SharedAuth/SharedAuthView.vue';
import ManageSettingsView from '@/views/Shared/SharedManageSerttings/SharedManageSettingsView.vue';
import { useSadminUserStore } from '@/stores/sadmin/sadminUser.js';
import Index from '@/views/Index.vue';

const sadminRoutes = {
  path: '/sadmin',
  children: [
    {
      path: 'auth',
      name: 'sadmin.auth',
      component: AuthView,
      meta: { title: 'Аутентификация | Суперадмин | Tikamis' },
      props: { title: 'Панель админа' }
    },
    {
      path: 'manage/settings',
      name: 'sadmin.manage.settings',
      component: ManageSettingsView,
      meta: { title: 'Настройки | Суперадмин | Tikamis' }
    },
    // 404 LAST
    {
      path: ':pathMatch(.*)*',
      redirect: 'sadmin/auth',
    }
  ]
};

function sadminBeforeEach(to) {
  const sadminUserStore = useSadminUserStore();

  if (!sadminUserStore.accessToken) {
    if (to.path === '/sadmin/auth') {
      return true;
    } else {
      return '/sadmin/auth';
    }
  }

  if (sadminUserStore.accessToken) {
    if (to.path === '/sadmin/auth' && sadminUserStore.accessToken) {
      return '/sadmin/manage/settings';
    } else {
      return true;
    }
  }

  return true;
}

export { sadminRoutes, sadminBeforeEach };
