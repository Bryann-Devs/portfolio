<script setup lang="ts">
import Menu from 'lucide-vue-next/dist/esm/icons/menu.js';
import X from 'lucide-vue-next/dist/esm/icons/x.js';
import { useToggle } from '@vueuse/core';

interface NavItem {
  href: string;
  label: string;
}

defineProps<{ items: NavItem[] }>();

const [open, toggleOpen] = useToggle(false);
</script>

<template>
  <div class="md:hidden">
    <button
      type="button"
      class="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--page-border)] bg-black/40 text-[var(--page-text)] backdrop-blur-xl hover:border-cyan-300/50 hover:text-cyan-200"
      :aria-expanded="open"
      aria-controls="mobile-navigation"
      :aria-label="open ? 'Close navigation' : 'Open navigation'"
      @click="toggleOpen()"
    >
      <X v-if="open" :size="20" aria-hidden="true" />
      <Menu v-else :size="20" aria-hidden="true" />
    </button>

    <div
      v-if="open"
      id="mobile-navigation"
      class="absolute inset-x-4 top-16 rounded-2xl border border-[var(--page-border)] bg-black/90 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl"
    >
      <a
        v-for="item in items"
        :key="item.href"
        :href="item.href"
        class="focus-ring font-tech block rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#24f4ff] hover:text-black hover:shadow-[0_0_26px_rgba(36,244,255,0.45)]"
        @click="toggleOpen(false)"
      >
        {{ item.label }}
      </a>
    </div>
  </div>
</template>
