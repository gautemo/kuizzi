import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope

self.addEventListener('install', () => {
  self.skipWaiting()
})
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

registerRoute(/https:\/\/fonts.bunny.net\/css.*/,
  new StaleWhileRevalidate()
);
