import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

export const playerRoutes: RouteConfig = {
  path: '/players',
  component: Layout,
  redirect: '/players/list',
  meta: {
    title: 'playerMgt',
    icon: 'people'
  },
  children: [
    {
      path: 'create',
      component: () => import(/* webpackChunkName: "example-create" */ '@/views/player/create.vue'),
      name: 'CreatePlayer',
      meta: {
        title: 'createPlayer',
        icon: 'edit'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import(/* webpackChunkName: "example-edit" */ '@/views/player/edit.vue'),
      name: 'EditPlayer',
      meta: {
        title: 'editPlayer',
        noCache: true,
        activeMenu: '/players/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "player-list" */ '@/views/player/list.vue'),
      name: 'PlayerList',
      meta: {
        title: 'playerList',
        icon: 'list'
      }
    }
  ]
}
