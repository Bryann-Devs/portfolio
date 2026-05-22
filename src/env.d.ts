/// <reference types="astro/client" />

declare module 'lucide-vue-next/dist/esm/icons/*.js' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
  }>;

  export default component;
}
