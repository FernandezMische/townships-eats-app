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
  { id: 1, name: 'Shisanyama', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400https://loremflickr.com/400/300/braai,meat?lock=1h=300https://loremflickr.com/400/300/braai,meat?lock=1fit=crop' },
  { id: 2, name: 'Kotas', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400https://loremflickr.com/400/300/sandwich,sub?lock=2h=300https://loremflickr.com/400/300/sandwich,sub?lock=2fit=crop' },
  { id: 3, name: 'Mogodu', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400https://loremflickr.com/400/300/stew,curry?lock=3h=300https://loremflickr.com/400/300/stew,curry?lock=3fit=crop' },
  { id: 4, name: 'Street Food', image: 'https://images.unsplash.com/photo-1613194373608-7b5e4f56d61e?w=400https://loremflickr.com/400/300/streetfood,fried?lock=4h=300https://loremflickr.com/400/300/streetfood,fried?lock=4fit=crop' },
  { id: 5, name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400https://loremflickr.com/400/300/burger,gourmet?lock=5h=300https://loremflickr.com/400/300/burger,gourmet?lock=5fit=crop' },
  { id: 6, name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400https://loremflickr.com/400/300/pizza,sourdough?lock=6h=300https://loremflickr.com/400/300/pizza,sourdough?lock=6fit=crop' },
  { id: 7, name: 'Chicken', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400https://loremflickr.com/400/300/roastedchicken?lock=7h=300https://loremflickr.com/400/300/roastedchicken?lock=7fit=crop' },
  { id: 8, name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400https://loremflickr.com/400/300/bakery,pastry?lock=8h=300https://loremflickr.com/400/300/bakery,pastry?lock=8fit=crop' },
  { id: 9, name: 'Drinks', image: 'https://images.unsplash.com/photo-1546171753-97d5c7b4a2a7?w=400https://loremflickr.com/400/300/drink,cocktail?lock=9h=300https://loremflickr.com/400/300/drink,cocktail?lock=9fit=crop' },
  { id: 10, name: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400https://loremflickr.com/400/300/dessert,cake?lock=10h=300https://loremflickr.com/400/300/dessert,cake?lock=10fit=crop' },
  { id: 11, name: 'Vegetarian', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400https://loremflickr.com/400/300/salad,bowl?lock=11' },h=300https://loremflickr.com/400/300/salad,bowl?lock=11' },fit=crop
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