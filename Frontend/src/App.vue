<!-- Frontend/src/App.vue -->
<template>
  <div id="app-wrapper">
    <AppHeader :userRole="userRole" @logout="logout" />

    <main class="app-content">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import AppHeader from './components/Shared/AppHeader.vue'; // Import the new AppHeader component
import AppFooter from './components/Shared/AppFooter.vue'; // Import the new AppFooter component

const router = useRouter();

// This ref will simulate the user's role. In a real app, this would come from an auth store.
const userRole = ref(localStorage.getItem('userRole') || null); // 'customer', 'vendor', 'driver', or null

// Watch for changes in the route to update active links if needed (though RouterLink handles most of it)
watch(router.currentRoute, (newRoute) => {
  // We can add logic here if we need to react to route changes for general app state
  console.log('Current route:', newRoute.fullPath);
});

const logout = () => {
  userRole.value = null; // Clear role
  localStorage.removeItem('userRole'); // Clear from local storage
  router.push('/login'); // Redirect to login page
};

// We'll add a temporary global login function for testing
window.loginAs = (role) => {
  userRole.value = role;
  localStorage.setItem('userRole', role); // Store role for persistence across reloads
  if (role === 'customer') {
    router.push('/customer/home');
  } else if (role === 'vendor') {
    router.push('/vendor/dashboard');
  } else if (role === 'driver') {
    router.push('/driver/dashboard');
  } else {
    router.push('/login');
  }
};
</script>

<style scoped>
#app-wrapper {
  font-family: var(--font-family-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text-dark);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}


.app-content {
  flex-grow: 1;
  padding: 0 20px;
}

</style>