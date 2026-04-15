<!-- Frontend/src/components/Customer/MealCard.vue -->
<template>
  <div class="meal-card">
    <img :src="meal.image" :alt="meal.name" class="meal-image">
    <div class="meal-info">
      <h4>{{ meal.name }}</h4>
      <p class="meal-description">{{ meal.description }}</p>
      <div class="meal-footer">
        <span class="meal-price">R{{ meal.price.toFixed(2) }}</span>
        <PrimaryButton text="Add" type="primary" @click="addToCart(meal)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import PrimaryButton from '../Shared/PrimaryButton.vue';

const props = defineProps({
  meal: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['add-to-cart']);

const addToCart = (meal) => {
  emit('add-to-cart', meal);
};
</script>

<style scoped>
.meal-card {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  gap: 15px;
  padding: 15px;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.meal-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.meal-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.meal-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.meal-info h4 {
  margin: 0;
  color: var(--color-text-dark);
  font-size: 1.1em;
}

.meal-description {
  margin: 5px 0 10px;
  font-size: 0.9em;
  color: var(--color-grey-text);
  line-height: 1.4;
  flex-grow: 1; /* Allow description to take space */
}

.meal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.meal-price {
  font-weight: bold;
  color: var(--color-primary-orange);
  font-size: 1.2em;
}

.meal-footer button {
  padding: 8px 18px; /* Slightly larger button for primary action */
  font-size: 0.9em;
}
</style>