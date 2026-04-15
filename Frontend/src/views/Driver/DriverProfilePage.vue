<template>
  <div class="driver-profile-page">
    <AppHeader title="Driver Profile" show-back-button />

    <main class="main-content container">
      <div class="profile-header flex-center-column mb-4">
        <div class="profile-avatar mb-2">
          <img src="https://loremflickr.com/100/100/car" alt="Driver Avatar" class="avatar-image" />
        </div>
        <h1 class="profile-name">{{ driver.name }}</h1>
        <p class="profile-email">{{ driver.email }}</p>
      </div>

      <div class="profile-section-card mb-4">
        <h2 class="section-title-card">Personal Details</h2>
        <div class="detail-row flex-between">
          <span class="detail-label">Name:</span>
          <span class="detail-value">{{ driver.name }}</span>
        </div>
        <div class="detail-row flex-between">
          <span class="detail-label">Phone:</span>
          <span class="detail-value">{{ driver.phone }}</span>
        </div>
        <div class="detail-row flex-between">
          <span class="detail-label">ID Number:</span>
          <span class="detail-value">{{ driver.idNumber }}</span>
        </div>
        <button class="edit-btn">Edit Personal Info</button>
      </div>

      <div class="profile-section-card mb-4">
        <h2 class="section-title-card">Vehicle Details</h2>
        <div class="detail-row flex-between">
          <span class="detail-label">Make & Model:</span>
          <span class="detail-value">{{ driver.vehicle.makeModel }}</span>
        </div>
        <div class="detail-row flex-between">
          <span class="detail-label">License Plate:</span>
          <span class="detail-value">{{ driver.vehicle.licensePlate }}</span>
        </div>
        <div class="detail-row flex-between">
          <span class="detail-label">Color:</span>
          <span class="detail-value">{{ driver.vehicle.color }}</span>
        </div>
        <button class="edit-btn">Edit Vehicle Info</button>
      </div>

      <button class="logout-btn btn-primary" @click="logout">Log Out</button>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/Shared/AppHeader.vue';
import AppFooter from '@/components/Shared/AppFooter.vue';

const router = useRouter();

const driver = ref({
  name: 'Sipho Dlamini',
  email: 'sipho.dlamini@townshipseats.com',
  phone: '+27 72 987 6543',
  idNumber: '9001015000087',
  avatar: 'https://loremflickr.com/100/100/car',
  vehicle: {
    makeModel: 'Toyota Corolla',
    licensePlate: 'CA 123-456',
    color: 'Silver',
  },
});

const logout = () => {
  alert('Logging out...');
  // In a real app: clear driver session/token, navigate to login
  router.push('/login');
};
</script>

<style scoped>
.driver-profile-page {
  display: flex;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-background-light);
}

.main-content {
  flex-grow: 1;
  padding: 1rem;
  padding-bottom: 70px;
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  background-color: var(--color-text-light);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--color-tertiary-blue); /* Driver theme color */
  background-color: var(--color-background-light);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
}

.avatar-image {
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 50%;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-text-dark);
  margin-bottom: 0.3rem;
}

.profile-email {
  font-size: 1rem;
  color: var(--color-grey-text);
}

.profile-section-card {
  background-color: var(--color-text-light);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.section-title-card {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-text-dark);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border-light);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-border-light);
}
.detail-row:last-of-type {
  border-bottom: none;
}

.detail-label {
  font-weight: bold;
  color: var(--color-text-dark);
}

.detail-value {
  color: var(--color-grey-text);
  text-align: right;
}

.edit-btn {
  background: none;
  border: none;
  color: var(--color-primary-orange); /* Use primary orange for action */
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  margin-left: 0.5rem;
  transition: opacity 0.2s ease;
}
.edit-btn:hover {
  opacity: 0.8;
}

.logout-btn {
  background-color: var(--color-accent-red);
  color: var(--color-text-light);
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-bottom: 1rem;
}
.logout-btn:hover {
  background-color: #c9302c;
}
</style>