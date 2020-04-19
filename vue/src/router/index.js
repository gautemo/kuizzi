import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Host from '../views/Host.vue'
import Play from '../views/Play.vue'
import Create from '../views/Create.vue'
import { signInAnonymously } from '@/firebase'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/play/:id',
    component: Play
  },
  {
    path: '/host',
    component: Host
  },
  {
    path: '/create',
    component: Create
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  await signInAnonymously();
  next();
})

export { router }