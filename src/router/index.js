import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'newHome',
    component: () => import('@/views/new/newHome.vue'),
    children: [
      {
        path: '',
        name: 'theHome',
        component: () => import('@/views/new/theHome.vue'),
      },
      {
        path: ':type/:lesson',
        name: 'questionList',
        component: () => import('@/views/new/questionList.vue')
      },
      {
        path: 'favorites',
        name: 'favorites',
        component: () => import('@/views/new/favorites.vue')
      },
      {
        path: 'exam/:lesson/:id',
        name: 'examView',
        component: () => import('@/views/new/examView.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/new/about.vue')
      },
      {
        path: 'chat',
        name: 'gemma',
        component: () => import('@/views/new/chatView.vue')
      }
    ]
  },
  {
    path: '/newHome',
    redirect: to => ({ path: '/', query: to.query, hash: to.hash })
  },
  {
    path: '/newHome/:pathMatch(.*)*',
    redirect: to => {
      const pathMatch = to.params.pathMatch
      const path = Array.isArray(pathMatch) ? pathMatch.join('/') : pathMatch
      return {
        path: `/${path || ''}`,
        query: to.query,
        hash: to.hash
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
