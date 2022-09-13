import { createRouter, createWebHistory } from 'vue-router'
import { userIsSignedIn } from './admin/firebaseAuth'
import { signInAnonym } from './firebase'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./entry/EntryPage.vue'),
    },
    {
      path: '/my-games',
      component: () => import('./admin/quizlist/QuizListShell.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/my-games/:id',
      component: () => import('./admin/editquiz/EditQuizShell.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/host/:id',
      component: () => import('./admin/host/HostGame.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/signin',
      component: () => import('./admin/signin/SignIn.vue'),
    },
    {
      path: '/play/:id',
      component: () => import('./play/PlayGame.vue'),
      meta: {
        anonymAuth: true,
        hideNav: true,
      },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./shared/NotFound.vue') },
  ],
})

router.beforeEach(async to => {
  if (to.matched.some(record => record.meta.auth)) {
    const isSignedIn = await userIsSignedIn()
    if (!isSignedIn) {
      return '/signin'
    }
  }
  if (to.matched.some(record => record.meta.anonymAuth)) {
    await signInAnonym()
  }
})
