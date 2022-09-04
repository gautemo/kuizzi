import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'uno.css'
import { checkIsSignInWithEmailLink } from './admin/firebaseAuth'

checkIsSignInWithEmailLink()

createApp(App).use(router).mount('#app')
