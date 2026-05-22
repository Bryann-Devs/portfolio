<script setup lang="ts">
import { computed, ref } from 'vue';
import { ExternalLink, Github, Search, SlidersHorizontal } from 'lucide-vue-next';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  github: string;
  demo: string;
  featured: boolean;
  category: 'Web App' | 'School Project' | 'Database' | 'Networking' | 'Other';
}

const props = defineProps<{ projects: Project[] }>();

const search = ref('');
const selectedCategory = ref('All');

const categories = computed(() => ['All', ...Array.from(new Set(props.projects.map((project) => project.category)))]);

const initialsFor = (title: string) =>
  title
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

const filteredProjects = computed(() => {
  const query = search.value.trim().toLowerCase();

  return props.projects.filter((project) => {
    const matchesCategory = selectedCategory.value === 'All' || project.category === selectedCategory.value;
    const searchableText = `${project.title} ${project.description} ${project.techStack.join(' ')}`.toLowerCase();
    return matchesCategory && searchableText.includes(query);
  });
});
</script>

<template>
  <section>
    <div class="glass-panel mb-8 grid gap-4 rounded-2xl p-4 md:grid-cols-[1fr_auto]">
      <label class="flex min-h-12 items-center gap-3 rounded-full border border-[var(--page-border)] bg-black/30 px-4 focus-within:border-cyan-300/50 focus-within:ring-[3px] focus-within:ring-cyan-300/20">
        <Search :size="18" class="text-cyan-300" aria-hidden="true" />
        <span class="sr-only">Search projects</span>
        <input
          v-model="search"
          type="search"
          placeholder="Search projects or tech stack"
          class="w-full bg-transparent text-sm text-[var(--page-text)] placeholder:text-[var(--page-muted)] focus:outline-none"
        />
      </label>

      <div class="flex flex-wrap items-center gap-2">
        <SlidersHorizontal :size="18" class="hidden text-cyan-300 sm:block" aria-hidden="true" />
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="focus-ring font-tech rounded-full border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.08em]"
          :class="
            selectedCategory === category
              ? 'border-cyan-300/60 bg-cyan-300/[0.15] text-cyan-100 shadow-[0_0_22px_rgba(36,244,255,0.18)]'
              : 'border-[var(--page-border)] text-[var(--page-muted)] hover:border-cyan-300/40 hover:text-cyan-100 hover:shadow-[0_0_18px_rgba(36,244,255,0.1)]'
          "
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="grid gap-5 md:grid-cols-2">
      <article
        v-for="project in filteredProjects"
        :key="project.id"
        class="card-hover group overflow-hidden rounded-2xl border border-[var(--page-border)] bg-[var(--page-surface)] shadow-2xl shadow-black/20"
      >
        <div class="relative h-56 overflow-hidden bg-black">
          <div class="absolute inset-6 rounded-2xl border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(0,245,255,0.14),rgba(255,255,255,0.03)_42%,rgba(0,0,0,0))] transition duration-300 group-hover:scale-[1.03]"></div>
          <div class="absolute left-8 top-8 h-3 w-24 rounded-full bg-cyan-200/40 shadow-[0_0_24px_rgba(0,245,255,0.25)]"></div>
          <div class="font-tech absolute bottom-12 right-8 text-5xl font-black tracking-[0.08em] text-cyan-100/20">
            {{ initialsFor(project.title) }}
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
          <span class="font-tech absolute bottom-4 left-4 shrink-0 rounded-full border border-cyan-300/20 bg-black/50 px-3 py-1 text-[0.65rem] font-semibold uppercase text-cyan-100 backdrop-blur-md">
            {{ project.category }}
          </span>
        </div>
        <div class="p-5 sm:p-6">
          <div class="mb-3 flex items-center justify-between gap-3">
            <h2 class="font-tech text-base font-bold uppercase leading-7 tracking-[0.06em] text-[var(--page-text)]">{{ project.title }}</h2>
          </div>
          <p class="text-sm leading-7 text-[var(--page-muted)]">{{ project.description }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="tech in project.techStack" :key="tech" class="font-tech rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.65rem] text-cyan-100">
              {{ tech }}
            </span>
          </div>
          <div class="mt-5 flex flex-wrap gap-3">
            <a
              :href="project.github"
              target="_blank"
              rel="noreferrer"
              class="focus-ring font-tech inline-flex items-center gap-2 rounded-full border border-[var(--page-border)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-cyan-200 hover:border-cyan-300/50 hover:text-cyan-50"
            >
              <Github :size="16" aria-hidden="true" />
              GitHub
            </a>
            <a
              :href="project.demo"
              target="_blank"
              rel="noreferrer"
              class="focus-ring font-tech inline-flex items-center gap-2 rounded-full border border-[var(--page-border)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-cyan-200 hover:border-cyan-300/50 hover:text-cyan-50"
            >
              <ExternalLink :size="16" aria-hidden="true" />
              Live Demo
            </a>
          </div>
        </div>
      </article>
    </div>

    <p v-if="filteredProjects.length === 0" class="rounded-2xl border border-[var(--page-border)] bg-[var(--page-surface)] p-6 text-center text-[var(--page-muted)]">
      No projects match your search yet.
    </p>
  </section>
</template>
