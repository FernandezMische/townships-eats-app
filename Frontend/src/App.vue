cd ~/townships-eats-app

cat > Frontend/src/App.vue << 'EOF'
<template>
  <div id="app-wrapper">
    <!-- Only show header if NOT on login or register page -->
    <AppHeader v-if="!isAuthPage" :userRole="userRole" @logout="logout" />

    <main class="app-content">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import AppHeader from './components/Shared/AppHeader.vue';
import AppFooter from './components/Shared/AppFooter.vue';

const router = useRouter();
const route = useRoute();

// Check if current page is login or register
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register';
});

const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  let role = localStorage.getItem('userRole');
  if (!role) {
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
EOF
