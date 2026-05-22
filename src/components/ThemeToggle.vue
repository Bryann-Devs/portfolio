<script setup lang="ts">
import { computed } from 'vue';
import { Moon, Sun } from 'lucide-vue-next';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'theme',
  initialValue: 'dark',
});

const toggleDark = useToggle(isDark);
const label = computed(() => (isDark.value ? 'Switch to light theme' : 'Switch to dark theme'));
</script>

<template>
  <button
    type="button"
    class="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--page-border)] bg-black/40 text-[var(--page-text)] backdrop-blur-xl hover:border-cyan-300/50 hover:text-cyan-200"
    :aria-label="label"
    :title="label"
    @click="toggleDark()"
  >
    <Sun v-if="isDark" :size="18" aria-hidden="true" />
    <Moon v-else :size="18" aria-hidden="true" />
  </button>
</template>
