import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'
import { serviceWorkerPlugin } from '@gautemo/vite-plugin-service-worker'

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetIcons({})],
    }),
    serviceWorkerPlugin({
      filename: 'sw.ts',
    }),
  ],
  build: {
    outDir: '../firebase/public',
  },
})
