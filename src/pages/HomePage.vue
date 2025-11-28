<script setup lang="ts">
import IpCalculator from '@/components/IpCalculator.vue'
</script>

<template>
  <main class="home">
    <IpCalculator />
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
  background-color: var(--color-background);
}
</style>