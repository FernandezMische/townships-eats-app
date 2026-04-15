<!-- Frontend/src/components/Shared/BackButton.vue -->
<template>
  <button class="back-button-component" @click="goBack">
    <slot>&larr; Back</slot>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1); // Go back to the previous page in history
};
</script>

<style scoped>
.back-button-component {
  background: none;
  color: var(--color-grey-text); /* Softer back button */
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 1em;
  text-decoration: none;
  display: inline-block;
  transition: color 0.3s ease;
}

.back-button-component:hover {
  color: var(--color-primary-orange);
  text-decoration: underline;
}
</style>