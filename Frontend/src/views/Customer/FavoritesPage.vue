<!-- Frontend/src/views/Customer/FavoritesPage.vue -->
<template>
  <div class="favorites-page">
    <div class="page-card favorites-card">
      <h2 class="text-center mb-20">Your Favorite Dishes</h2>
      <p class="text-center mb-20" v-if="favoriteItems.length === 0">You haven't added any favorites yet!</p>

      <div class="favorites-list" v-else>
        <div v-for="item in favoriteItems" :key="item.id" class="favorite-item flex-between">
          <div class="item-info">
            <img :src="item.image" :alt="item.name" class="item-image">
            <div>
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.restaurant }}</p>
            </div>
          </div>
          <div class="item-actions">
            <span class="item-price">R{{ item.price.toFixed(2) }}</span>
            <PrimaryButton text="Remove" type="danger" @click="removeItem(item.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue'; // Import PrimaryButton

const favoriteItems = ref([
  { id: 1, name: 'Spicy Chakalaka Burger', restaurant: 'Ghetto Burgers', price: 75.00, image: 'https://loremflickr.com/50/50/burger' },
  { id: 2, name: 'Kota Deluxe', restaurant: 'Mama Thandi\'s Kitchen', price: 50.00, image: 'https://loremflickr.com/50/50/sandwich' },
  { id: 3, name: 'Vetkoek & Mince', restaurant: 'Kasi Flavours', price: 35.00, image: 'https://loremflickr.com/50/50/curry' },
]);

const removeItem = (itemId) => {
  favoriteItems.value = favoriteItems.value.filter(item => item.id!== itemId);
  alert('Item removed from favorites!');
};
</script>

<style scoped>
/* Keep existing styles */
.favorites-page {
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
  padding: 20px;
}

.favorites-card {
  max-width: 700px;
}

.favorites-list {
  margin-top: 20px;
}

.favorite-item {
  background-color: var(--color-background-light);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.05);
}

.item-info {
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: left;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid var(--color-border-light);
}

.item-info h3 {
  margin: 0;
  color: var(--color-text-dark);
}

.item-description {
  margin: 0;
  font-size: 0.9em;
  color: var(--color-grey-text);
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-price {
  font-weight: bold;
  color: var(--color-primary-orange);
  font-size: 1.1em;
}
</style>