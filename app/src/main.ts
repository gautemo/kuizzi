import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'uno.css'
import { checkIsSignInWithEmailLink } from './admin/firebaseAuth'
import { serviceWorkerFile } from 'virtual:vite-plugin-service-worker'

checkIsSignInWithEmailLink()

createApp(App).use(router).mount('#app')

if (import.meta.env.VITE_DISABLE_ANALYTICS !== 'true') {
  if (!sessionStorage.getItem('_swa') && document.referrer.indexOf(location.protocol + '//' + location.host) !== 0) {
    fetch(
      'https://counter.dev/track?' +
        new URLSearchParams({
          referrer: document.referrer,
          screen: screen.width + 'x' + screen.height,
          id: '7927cc40-3229-4986-b981-0e1e6c4a93c6',
          utcoffset: '1',
        })
    )
  }
  sessionStorage.setItem('_swa', '1')
}

try {
  navigator.serviceWorker.register(serviceWorkerFile, {
    type: 'module',
  })
} catch (error) {
  console.error('Service worker registration failed', error)
}