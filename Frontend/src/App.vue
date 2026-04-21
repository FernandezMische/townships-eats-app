// Replace the entire App.vue with this:
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
import { ref, watch, onMounted } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import AppHeader from './components/Shared/AppHeader.vue';
import AppFooter from './components/Shared/AppFooter.vue';

const router = useRouter();
const route = useRoute();

// Get user role from token or localStorage
const getUserRole = () => {
  // First check if we have a token
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  // Try to get role from localStorage
  let role = localStorage.getItem('userRole');
  if (!role) {
    // Try to decode role from token if possible
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      role = payload.role || 'customer';
      localStorage.setItem('userRole', role);
    } catch (e) {
      role = 'customer';
    }
  }
  return role;
};

const userRole = ref(getUserRole());

// Watch for route changes to update userRole if needed
watch(router.currentRoute, (newRoute) => {
  // Don't redirect in App.vue - let components handle their own auth
  console.log('Current route:', newRoute.fullPath);
});
console.log('🔍 App.vue - userRole:', userRole.value);
console.log('🔍 App.vue - token:', localStorage.getItem('token'));
console.log('🔍 App.vue - current path:', window.location.hash);
// Also check on mount
onMounted(() => {
  userRole.value = getUserRole();
});

const logout = () => {
  userRole.value = null;
  localStorage.removeItem('userRole');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};

// Global login function for testing
window.loginAs = (role) => {
  userRole.value = role;
  localStorage.setItem('userRole', role);
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
