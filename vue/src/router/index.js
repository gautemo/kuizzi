import { createRouter, createHistory } from '@posva/vue-router-next'
import Home from '../views/Home.vue'
import Host from '../views/Host.vue'
import Play from '../views/Play.vue'

const routes = [
  {
    path: '/',
    component: Play
  },
  {
    path: '/host',
    component: Host
  },
]

export const router = createRouter({
  history: createHistory(),
  routes
})