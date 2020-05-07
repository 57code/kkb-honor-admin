import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

export const heroRoutes: RouteConfig = {
  path: '/heros',
  component: Layout,
  redirect: '/heros/list',
  meta: {
    title: 'heroMgt',
    icon: 'qq'
  },
  children: [
    {
      path: 'banpick',
      component: () => import('@/views/hero/banpick.vue'),
      name: 'BanPick',
      meta: {
        title: 'banPick',
        icon: 'like'
      }
    },
    {
      path: 'banpick/:id',
      component: () => import('@/views/hero/banpick-detail.vue'),
      name: 'BanPickDetail',
      meta: {
        title: 'banPickDetail',
        icon: 'chart',
        activeMenu: '/heros/banpick',
        hidden: true
      }
    }
  ]
}