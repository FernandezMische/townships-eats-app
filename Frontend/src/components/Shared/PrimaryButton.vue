<!-- Frontend/src/components/Shared/PrimaryButton.vue -->
<template>
  <button :class="['primary-button', buttonClass]" @click="handleClick">
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: 'Click Me',
  },
  type: {
    type: String,
    default: 'primary', // Can be 'primary', 'secondary', 'danger', 'success'
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const buttonClass = computed(() => {
  return {
    'btn-primary': props.type === 'primary',
    'btn-secondary': props.type === 'secondary',
    'btn-danger': props.type === 'danger',
    'btn-success': props.type === 'success',
    'btn-full-width': props.fullWidth,
  };
});

const handleClick = (event) => {
  emit('click', event);
};
</script>

<style scoped>
.primary-button {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease, filter 0.3s ease;
  white-space: nowrap; /* Prevent text wrapping */
}

.primary-button:hover {
  filter: brightness(90%);
}

/* Default to primary type */
.primary-button.btn-primary {
  background-color: var(--color-primary-orange);
  color: var(--color-text-light);
}

.primary-button.btn-secondary {
  background-color: var(--color-grey-text);
  color: var(--color-text-light);
}

.primary-button.btn-danger {
  background: linear-gradient(135deg, #ec1717, #d7301d);/* Red */
  color: var(--color-text-light);
}

.primary-button.btn-success {
  background-color: var(--color-secondary-green);
  color: var(--color-text-light);
}

.primary-button.btn-full-width {
  width: 100%;
}
</style>