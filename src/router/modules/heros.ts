import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

export const heroRoutes: RouteConfig = {
  path: '/heros',
  component: Layout,
  redirect: '/heros/list',
  meta: {
    title: 'heroMgt',
    icon: 'hero'
  },
  children: [
    {
      path: 'create',
      component: () => import(/* webpackChunkName: "example-create" */ '@/views/hero/create.vue'),
      name: 'CreateHero',
      meta: {
        title: 'createHero',
        icon: 'edit'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import(/* webpackChunkName: "example-edit" */ '@/views/hero/edit.vue'),
      name: 'EditHero',
      meta: {
        title: 'editHero',
        noCache: true,
        activeMenu: '/heros/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "hero-list" */ '@/views/hero/list.vue'),
      name: 'HeroList',
      meta: {
        title: 'heroList',
        icon: 'list'
      }
    },
    {
      path: 'banpick',
      component: () => import(/* webpackChunkName: "banpick-list" */ '@/views/hero/banpick.vue'),
      name: 'BanPick',
      meta: {
        title: 'banPick',
        icon: 'like'
      }
    },
    {
      path: 'banpick/:id(\\d+)',
      component: () => import(/* webpackChunkName: "banpick-detail" */ '@/views/hero/banpick-detail.vue'),
      name: 'BanPickDetail',
      meta: {
        title: 'banPickDetail',
        icon: 'chart',
        activeMenu: '/heros/banpick',
        hidden: true
      }
    },
  ]
}
