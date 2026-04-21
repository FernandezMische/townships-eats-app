<template>
  <div class="categories-page">
    <div class="page-card">
      <h2 class="text-center mb-20">Browse Categories</h2>
      <div class="categories-grid">
        <div v-for="category in categories" :key="category.id" class="category-card" @click="goToCategory(category.id)">
          <div class="category-image">
            <img :src="category.image" :alt="category.name" />
          </div>
          <h3>{{ category.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const categories = ref([
  { id: 1, name: 'Shisanyama', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop' },
  { id: 2, name: 'Kotas', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop' },
  { id: 3, name: 'Mogodu', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop' },
  { id: 4, name: 'Street Food', image: 'https://images.unsplash.com/photo-1613194373608-7b5e4f56d61e?w=400&h=300&fit=crop' },
  { id: 5, name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
  { id: 6, name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop' },
  { id: 7, name: 'Chicken', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop' },
  { id: 8, name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop' },
  { id: 9, name: 'Drinks', image: 'https://images.unsplash.com/photo-1546171753-97d5c7b4a2a7?w=400&h=300&fit=crop' },
  { id: 10, name: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
  { id: 11, name: 'Vegetarian', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop' }
]);

const goToCategory = (categoryId) => {
  router.push(`/customer/categories/${categoryId}/dishes`);
};
</script>

<style scoped>
.categories-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.category-card {
  cursor: pointer;
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  background: white;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.category-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-card h3 {
  margin-top: 12px;
  font-size: 1.1rem;
  color: var(--color-text-dark);
}

.text-center {
  text-align: center;
}

.mb-20 {
  margin-bottom: 20px;
}
</style>
