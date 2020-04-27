import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue'

export const playerRoutes: RouteConfig = {
  path: '/players',
  component: Layout,
  meta: {
    title: 'playerMgt', // i18n信息需要额外处理
    icon: 'peoples'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/player/list.vue'),
      meta: {
        title: 'playerList',
        icon: 'players'
      }
    },
    {
      path: 'create',
      component: () => import('@/views/player/create.vue'),
      meta: {
        title: 'createPlayer',
        icon: 'edit'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/player/edit.vue'),
      meta: {
        title: 'editPlayer',
        hidden: true, // 不需要导航菜单
        noCache: true, // tags页签中应该多个，不应该缓存
        activeMenu: '/players/list', // 左侧导航菜单相关激活url
      }
    },
  ]
}