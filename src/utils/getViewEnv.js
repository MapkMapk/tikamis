import router from '@/router/index.js'
export function getViewEnv() {
  return String(router.currentRoute.value.fullPath.split('/')[1]);
}