<script setup lang="ts">
import HomePage from '@/pages/HomePage.vue'
</script>

<template>
  <div class="app">
    <HomePage />
  </div>
</template>

<style>
:root {
  --color-primary: #6e8efb;
  --color-primary-dark: #5a7be0;
  --color-secondary: #f3f4f6;
  --color-secondary-dark: #e5e7eb;
  --color-text: #4b5563;
  --color-text-light: #9ca3af;
  --color-background: #ffffff;
  --color-border: #d1d5db;
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--color-text);
  background-color: var(--color-background);
}
</style>