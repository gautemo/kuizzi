import { createRouter, createHistory } from '@posva/vue-router-next'
import Home from '../views/Home.vue'
import Host from '../views/Host.vue'
import Play from '../views/Play.vue'
import Create from '../views/Create.vue'

const routes = [
  {
    path: '/',
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

export const router = createRouter({
  history: createHistory(),
  routes
})