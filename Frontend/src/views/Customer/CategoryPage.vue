<template>
  <div class="category-page">
    <div class="page-card category-card">
      <h2 class="text-center">Explore Categories</h2>
      <p class="text-center mb-20">Find your next delicious meal by browsing our curated categories.</p>

      <div class="category-grid">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          class="category-tile" 
          @click="viewCategory(category.id)"
          :style="{ backgroundImage: `url(${category.image})` }"
        >
          <div class="category-overlay">
            <h3>{{ category.name }}</h3>
          </div>
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
  { id: 1, name: 'Shisanyama', image: 'https://loremflickr.com/400/300/braai,meat?lock=1' },
  { id: 2, name: 'Kotas', image: 'https://loremflickr.com/400/300/sandwich,sub?lock=2' },
  { id: 3, name: 'Mogodu', image: 'https://loremflickr.com/400/300/stew,curry?lock=3' },
  { id: 4, name: 'Street Food', image: 'https://loremflickr.com/400/300/streetfood,fried?lock=4' },
  { id: 5, name: 'Burgers', image: 'https://loremflickr.com/400/300/burger,gourmet?lock=5' },
  { id: 6, name: 'Pizza', image: 'https://loremflickr.com/400/300/pizza,sourdough?lock=6' },
  { id: 7, name: 'Chicken', image: 'https://loremflickr.com/400/300/roastedchicken?lock=7' },
  { id: 8, name: 'Bakery', image: 'https://loremflickr.com/400/300/bakery,pastry?lock=8' },
  { id: 9, name: 'Drinks', image: 'https://loremflickr.com/400/300/drink,cocktail?lock=9' },
  { id: 10, name: 'Desserts', image: 'https://loremflickr.com/400/300/dessert,cake?lock=10' },
  { id: 11, name: 'Vegetarian', image: 'https://loremflickr.com/400/300/salad,bowl?lock=11' },
]);

const viewCategory = (categoryId) => {
  router.push({ name: 'CategoryDishes', params: { id: categoryId } });
};
</script>

<style scoped>
.category-page {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
}

.category-card {
  max-width: 1200px;
  width: 100%;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.category-tile {
  position: relative;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.category-tile:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.2);
}

.category-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 20px 15px 15px;
  display: flex;
  align-items: flex-end;
  height: 50%;
}

.category-overlay h3 {
  color: white;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
</style>