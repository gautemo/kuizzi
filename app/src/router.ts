import { createRouter, createWebHistory } from 'vue-router'
import { userIsSignedIn } from './admin/firebaseAuth'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./entry/EntryPage.vue'),
    },
    {
      path: '/my-games',
      component: () => import('./admin/QuizListShell.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/my-games/:id',
      component: () => import('./admin/EditQuizShell.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/signin',
      component: () => import('./admin/SignIn.vue')
    }
  ]
})

router.beforeEach(async to => {
  if(to.matched.some(record => record.meta.auth)){
    const isSignedIn = await userIsSignedIn()
    if(!isSignedIn){
      return '/signin'
    }
  }
})
