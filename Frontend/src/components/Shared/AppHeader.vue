<!-- Frontend/src/components/Shared/AppHeader.vue -->
<template>
  <header class="app-header-component">
    <div class="header-content">
      <!-- Logo Section -->
      <RouterLink to="/" class="logo-link">
        <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="Kasi Eats Logo" class="app-logo">
        <h2 style="color: var(--color-primary-orange); margin: 0;">Kasi Eats</h2>
      </RouterLink>

      <!-- Hamburger Menu Button (Mobile Only) -->
      <button class="mobile-menu-btn" @click="toggleMenu" aria-label="Menu">
        <span class="hamburger" :class="{ active: isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <!-- Navigation - Desktop & Mobile -->
      <nav class="main-nav" :class="{ 'mobile-open': isMenuOpen }">
        <!-- Conditional Navigation based on userRole -->
        <template v-if="userRole === 'customer'">
          <RouterLink to="/customer/home" class="nav-item" @click="closeMenu">Home</RouterLink>
          <RouterLink to="/customer/categories" class="nav-item" @click="closeMenu">Categories</RouterLink>
          <RouterLink to="/customer/favorites" class="nav-item" @click="closeMenu">Favorites</RouterLink>
          <RouterLink to="/customer/profile" class="nav-item" @click="closeMenu">Profile</RouterLink>
          <RouterLink to="/customer/cart" class="nav-item" @click="closeMenu">Cart</RouterLink>
          <PrimaryButton @click="logout" text="Logout" type="danger" />
        </template>
        <template v-else-if="userRole === 'vendor'">
          <RouterLink to="/vendor/dashboard" class="nav-item" @click="closeMenu">Dashboard</RouterLink>
          <RouterLink to="/vendor/menu-management" class="nav-item" @click="closeMenu">Menu</RouterLink>
          <PrimaryButton @click="logout" text="Logout" type="danger" />
        </template>
        <template v-else-if="userRole === 'driver'">
          <RouterLink to="/driver/dashboard" class="nav-item" @click="closeMenu">Dashboard</RouterLink>
          <PrimaryButton @click="logout" text="Logout" type="danger" />
        </template>
        <template v-else>
          <!-- Not logged in -->
          <RouterLink to="/login" class="nav-item" @click="closeMenu">Login</RouterLink>
          <RouterLink to="/register" class="nav-item" @click="closeMenu">Register</RouterLink>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import PrimaryButton from './PrimaryButton.vue';

const props = defineProps({
  userRole: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['logout']);
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const logout = () => {
  closeMenu();
  emit('logout');
};
</script>

<style scoped>
.app-header-component {
  background: #ffffff;
  padding: 18px 40px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
}

/* Center content */
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

/* Logo */
.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-logo {
  height: 42px;
  transition: transform 0.3s ease;
}

.logo-link:hover .app-logo {
  transform: scale(1.08);
}

/* Desktop Navigation */
.main-nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

/* Nav items */
.nav-item {
  font-weight: 600;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.95rem;
  position: relative;
  transition: all 0.3s ease;
  padding-bottom: 6px;
}

/* Smooth underline animation */
.nav-item::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: var(--color-primary-orange);
  bottom: 0;
  left: 0;
  transition: width 0.3s ease;
}

.nav-item:hover {
  color: var(--color-primary-orange);
}

.nav-item:hover::after {
  width: 100%;
}

.nav-item.router-link-exact-active {
  color: var(--color-primary-orange);
}

.nav-item.router-link-exact-active::after {
  width: 100%;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
}

/* Hamburger Icon */
.hamburger {
  width: 25px;
  height: 20px;
  position: relative;
  display: inline-block;
}

.hamburger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--color-primary-orange);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.hamburger span:nth-child(1) {
  top: 0;
}

.hamburger span:nth-child(2) {
  top: 8px;
}

.hamburger span:nth-child(3) {
  top: 16px;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg);
  top: 8px;
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg);
  top: 8px;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .app-header-component {
    padding: 12px 20px;
  }

  .mobile-menu-btn {
    display: block;
  }

  .main-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    max-width: 300px;
    height: 100vh;
    background: #ffffff;
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 20px 20px;
    gap: 15px;
    transition: right 0.3s ease;
    z-index: 1000;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  }

  .main-nav.mobile-open {
    right: 0;
  }

  .nav-item {
    width: 100%;
    padding: 12px 0;
    font-size: 1.1rem;
  }

  .nav-item::after {
    bottom: 8px;
  }

  /* Style buttons in mobile menu */
  .main-nav button {
    width: 100%;
    margin-top: 10px;
  }
}

/* Tablet Styles */
@media (min-width: 769px) and (max-width: 1024px) {
  .app-header-component {
    padding: 15px 30px;
  }
  
  .main-nav {
    gap: 20px;
  }
}
</style>
