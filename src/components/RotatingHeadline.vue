<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const phrases = ['SOFTWARE ENGINEER', 'IT SOLUTIONS', 'DATA ANALYST'] as const;
type HeadlineMode = 'single' | 'summary';

const activeIndex = ref(0);
const mode = ref<HeadlineMode>('single');
const hasStarted = ref(false);
const reduceMotion = ref(false);
const skipSummary = ref(false);
const timers: ReturnType<typeof window.setTimeout>[] = [];

const activePhrase = computed(() => phrases[activeIndex.value]);
const headlineText = computed(() => (mode.value === 'summary' ? phrases.join(' / ') : activePhrase.value));
const transitionName = computed(() => (mode.value === 'summary' ? 'headline-summary' : 'headline-rotate'));

const clearTimers = () => {
  while (timers.length) {
    const timer = timers.pop();
    if (timer) {
      window.clearTimeout(timer);
    }
  }
};

const schedule = (callback: () => void, delay: number) => {
  timers.push(window.setTimeout(callback, delay));
};

const scheduleNextStep = () => {
  schedule(() => {
    if (activeIndex.value < phrases.length - 1) {
      activeIndex.value += 1;
      scheduleNextStep();
      return;
    }

    if (skipSummary.value) {
      activeIndex.value = 0;
      mode.value = 'single';
      scheduleNextStep();
      return;
    }

    mode.value = 'summary';
  }, 3800);
};

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  skipSummary.value = window.matchMedia('(max-width: 420px)').matches;

  if (reduceMotion.value) {
    return;
  }

  schedule(() => {
    hasStarted.value = true;
    scheduleNextStep();
  }, 650);
});

onUnmounted(() => {
  clearTimers();
});
</script>

<template>
  <div class="mx-auto mb-8 min-h-8 max-w-full text-center sm:min-h-10">
    <span class="sr-only">SOFTWARE ENGINEER, IT SOLUTIONS, DATA ANALYST</span>

    <span
      v-if="reduceMotion"
      aria-hidden="true"
      class="rotating-headline headline-summary-text inline-flex items-center justify-center whitespace-nowrap font-normal uppercase"
    >
      <template v-for="(phrase, index) in phrases" :key="phrase">
        <span class="font-wide bg-gradient-to-r from-white via-[#c5f8ff] to-[#67eaff] bg-clip-text text-transparent">
          {{ phrase }}
        </span>
        <span v-if="index < phrases.length - 1" class="summary-separator" aria-hidden="true">/</span>
      </template>
    </span>

    <Transition v-else :name="transitionName" mode="out-in">
      <span
        v-if="hasStarted"
        :key="`${mode}-${headlineText}`"
        aria-hidden="true"
        class="rotating-headline inline-block font-normal uppercase"
        :class="mode === 'summary' ? 'headline-summary-text' : 'headline-single-text'"
      >
        <template v-if="mode === 'summary'">
          <template v-for="(phrase, index) in phrases" :key="phrase">
            <span class="font-wide bg-gradient-to-r from-white via-[#c5f8ff] to-[#67eaff] bg-clip-text text-transparent">
              {{ phrase }}
            </span>
            <span v-if="index < phrases.length - 1" class="summary-separator" aria-hidden="true">/</span>
          </template>
        </template>
        <span v-else class="font-wide bg-gradient-to-r from-white via-[#c5f8ff] to-[#67eaff] bg-clip-text text-transparent">
          {{ activePhrase }}
        </span>
      </span>
    </Transition>
  </div>
</template>

<style scoped>
.headline-rotate-enter-active,
.headline-rotate-leave-active {
  transition:
    opacity 950ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 950ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 950ms cubic-bezier(0.16, 1, 0.3, 1),
    clip-path 950ms cubic-bezier(0.16, 1, 0.3, 1);
}

.rotating-headline {
  color: #c5f8ff;
  text-shadow: 0 0 16px rgba(197, 248, 255, 0.45);
}

.headline-single-text {
  font-size: 20px;
  letter-spacing: 0.35em;
}

.headline-summary-text {
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  letter-spacing: clamp(0.02em, 0.36vw, 0.09em);
}

.summary-separator {
  margin-inline: 0.34em;
  font-family: Inter, Arial, sans-serif;
  color: #c5f8ff;
  letter-spacing: 0;
  text-shadow: 0 0 12px rgba(197, 248, 255, 0.32);
}

.headline-rotate-enter-from {
  opacity: 0;
  filter: blur(6px);
  transform: translateX(24px);
  clip-path: inset(0 100% 0 0);
}

.headline-rotate-enter-to,
.headline-rotate-leave-from {
  opacity: 1;
  filter: blur(0);
  transform: translateX(0);
  clip-path: inset(0 0 0 0);
  text-shadow: 0 0 16px rgba(197, 248, 255, 0.45);
}

.headline-rotate-leave-to {
  opacity: 0;
  filter: blur(6px);
  transform: translateX(-24px);
  clip-path: inset(0 0 0 100%);
}

.headline-summary-enter-active,
.headline-summary-leave-active {
  transition:
    opacity 950ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 950ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 950ms cubic-bezier(0.16, 1, 0.3, 1),
    clip-path 950ms cubic-bezier(0.16, 1, 0.3, 1),
    letter-spacing 950ms cubic-bezier(0.16, 1, 0.3, 1);
}

.headline-summary-enter-from {
  opacity: 0;
  filter: blur(5px);
  transform: scale(0.96);
  clip-path: inset(0 50% 0 50%);
}

.headline-summary-enter-to,
.headline-summary-leave-from {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
  clip-path: inset(0 0 0 0);
}

.headline-summary-leave-to {
  opacity: 0;
  filter: blur(5px);
  transform: scale(0.98);
  clip-path: inset(0 50% 0 50%);
}
</style>
