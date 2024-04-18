import router from '@/router/index.js'
export default function isEnv(env) {
  if (env) {
    return String(router.currentRoute.value.fullPath.split('/')[3]) === env.toLowerCase()
  }
  console.log('Ошибка в utils/isEnv, не был передан параметр');
  return false;
}