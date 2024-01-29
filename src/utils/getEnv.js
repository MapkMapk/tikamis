import router from '@/router/index.js'
export function getEnv() {
   return router.currentRoute.value.fullPath.split('/')[1]
}