import { createApp } from 'vue'
import App from './App.vue'
import { checkIsSignInWithEmailLink } from './firebase'
import { router } from './router'
import 'uno.css'

checkIsSignInWithEmailLink()

createApp(App).use(router).mount('#app')
