import router from '@/router/index.js'
export function env(env) {
  if (env) {
    return String(router.currentRoute.value.fullPath.split('/')[1]) === env.toLowerCase()
  }
  console.log('Ошибка в utils/env, не был передан параметр');
  return false;
}