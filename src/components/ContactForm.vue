<script setup lang="ts">
import { ref } from 'vue';
import Check from 'lucide-vue-next/dist/esm/icons/check.js';
import Copy from 'lucide-vue-next/dist/esm/icons/copy.js';
import Github from 'lucide-vue-next/dist/esm/icons/github.js';
import Linkedin from 'lucide-vue-next/dist/esm/icons/linkedin.js';
import Mail from 'lucide-vue-next/dist/esm/icons/mail.js';
import Send from 'lucide-vue-next/dist/esm/icons/send.js';

interface Props {
  email: string;
  github: string;
  linkedin: string;
}

const props = defineProps<Props>();

const copied = ref(false);
const submitted = ref(false);

const copyEmail = async () => {
  await navigator.clipboard.writeText(props.email);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 1800);
};

const submitForm = () => {
  submitted.value = true;
};
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
    <form class="glass-panel rounded-2xl p-5 sm:p-6" @submit.prevent="submitForm">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="mb-2 block text-sm font-medium text-[var(--page-text)]">Name</span>
          <input class="focus-ring min-h-12 w-full rounded-xl border border-[var(--page-border)] bg-black/30 px-4 text-sm text-[var(--page-text)]" type="text" name="name" autocomplete="name" required />
        </label>
        <label class="block">
          <span class="mb-2 block text-sm font-medium text-[var(--page-text)]">Email</span>
          <input class="focus-ring min-h-12 w-full rounded-xl border border-[var(--page-border)] bg-black/30 px-4 text-sm text-[var(--page-text)]" type="email" name="email" autocomplete="email" required />
        </label>
      </div>

      <label class="mt-4 block">
        <span class="mb-2 block text-sm font-medium text-[var(--page-text)]">Message</span>
        <textarea class="focus-ring min-h-40 w-full resize-y rounded-xl border border-[var(--page-border)] bg-black/30 px-4 py-3 text-sm text-[var(--page-text)]" name="message" required></textarea>
      </label>

      <button type="submit" class="focus-ring glow-button mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold">
        <Send :size="16" aria-hidden="true" />
        Send Message
      </button>

      <p v-if="submitted" class="mt-4 rounded-md border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
        This demo form is ready for a backend or service like Formspree. For now, use the email links beside it.
      </p>
    </form>

    <aside class="glass-panel rounded-2xl p-5 sm:p-6">
      <h2 class="text-xl font-semibold text-[var(--page-text)]">Connect</h2>
      <p class="mt-3 leading-7 text-[var(--page-muted)]">
        I am open to internship conversations, school collaborations, and junior developer opportunities.
      </p>

      <div class="mt-6 grid gap-3">
        <a :href="`mailto:${email}`" class="focus-ring inline-flex items-center gap-3 rounded-full border border-[var(--page-border)] px-4 py-3 text-sm font-semibold text-[var(--page-text)] hover:border-cyan-300/50 hover:text-cyan-200">
          <Mail :size="18" aria-hidden="true" />
          {{ email }}
        </a>
        <button type="button" class="focus-ring inline-flex items-center gap-3 rounded-full border border-[var(--page-border)] px-4 py-3 text-sm font-semibold text-[var(--page-text)] hover:border-cyan-300/50 hover:text-cyan-200" @click="copyEmail">
          <Check v-if="copied" :size="18" aria-hidden="true" />
          <Copy v-else :size="18" aria-hidden="true" />
          {{ copied ? 'Copied email' : 'Copy email' }}
        </button>
        <a :href="github" target="_blank" rel="noreferrer" class="focus-ring inline-flex items-center gap-3 rounded-full border border-[var(--page-border)] px-4 py-3 text-sm font-semibold text-[var(--page-text)] hover:border-cyan-300/50 hover:text-cyan-200">
          <Github :size="18" aria-hidden="true" />
          GitHub
        </a>
        <a :href="linkedin" target="_blank" rel="noreferrer" class="focus-ring inline-flex items-center gap-3 rounded-full border border-[var(--page-border)] px-4 py-3 text-sm font-semibold text-[var(--page-text)] hover:border-cyan-300/50 hover:text-cyan-200">
          <Linkedin :size="18" aria-hidden="true" />
          LinkedIn
        </a>
      </div>
    </aside>
  </div>
</template>
