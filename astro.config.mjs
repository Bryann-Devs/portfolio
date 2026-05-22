import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        strict: true,
        allow: [projectRoot],
      },
    },
    optimizeDeps: {
      disabled: true,
      exclude: ['@astrojs/vue', 'lucide-vue-next'],
    },
  },
  site: 'https://example.com',
});
