import { createRouter, createWebHistory, onBeforeRouteLeave } from 'vue-router'
import Home from '../views/Home.vue'
import Host from '../views/Host.vue'
import Play from '../views/Play.vue'
import MyGames from '../views/MyGames.vue'
import SignIn from '../views/SignIn.vue'
import EditGame from '../views/EditGame.vue'
import { signInAnonymously, getCurrentUser } from '@/firebase'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/play/:pin',
    component: Play,
    meta: {
      requiresAnonymAuth: true
    }
  },
  {
    path: '/my-games',
    component: MyGames,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my-games/:id',
    component: EditGame,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signin',
    component: SignIn
  },
  {
    path: '/host/:pin',
    component: Host,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = await getCurrentUser();
  if (requiresAuth && (!user || user.isAnonymous)) {
    next('/signin');
  } else {
    const requiresAnonymAuth = to.matched.some(record => record.meta.requiresAnonymAuth);
    if (requiresAnonymAuth && !user) {
      await signInAnonymously();
    }
    next();
  }
})

export { router, onBeforeRouteLeave }