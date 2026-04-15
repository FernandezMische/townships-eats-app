<template>
  <div class="driver-earnings-page">
    <AppHeader title="My Earnings" show-back-button />

    <main class="main-content container">
      <div class="welcome-banner driver-theme text-center">
        <h1 class="welcome-title">Your Earnings Report</h1>
        <p class="welcome-subtitle">Track your delivery income and manage payouts.</p>
      </div>

      <section class="current-earnings-section mb-4">
        <h2 class="section-title">Current Balance</h2>
        <div class="balance-card text-center">
          <p class="balance-label">Available for Payout</p>
          <span class="balance-amount">R{{ currentBalance.toFixed(2) }}</span>
          <button class="btn-primary payout-btn" @click="initiatePayout">
            Request Payout
          </button>
          <p class="last-payout text-muted mt-2">Last payout: {{ lastPayoutDate }}</p>
        </div>
      </section>

      <section class="delivery-stats-section mb-4">
        <h2 class="section-title">Delivery Statistics</h2>
        <div class="stats-filter flex-between mb-3">
          <label for="statsPeriod" class="filter-label">View:</label>
          <select id="statsPeriod" v-model="statsPeriod" class="filter-select">
            <option value="today">Today</option>
            <option value="last7days">Last 7 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="allTime">All Time</option>
          </select>
        </div>

        <div v-if="loadingStats" class="loading-state text-center">
          <div class="spinner"></div>
          <p class="mt-3 text-muted">Loading statistics...</p>
        </div>
        <div v-else class="stats-grid">
          <div class="stat-item-card">
            <p class="stat-label">Total Deliveries</p>
            <span class="stat-value">{{ deliveryStats.totalDeliveries }}</span>
          </div>
          <div class="stat-item-card">
            <p class="stat-label">Total Earned</p>
            <span class="stat-value">R{{ deliveryStats.totalEarned.toFixed(2) }}</span>
          </div>
          <div class="stat-item-card">
            <p class="stat-label">Avg. Earnings/Delivery</p>
            <span class="stat-value">R{{ deliveryStats.avgEarningsPerDelivery.toFixed(2) }}</span>
          </div>
          <div class="stat-item-card">
            <p class="stat-label">Avg. Delivery Time</p>
            <span class="stat-value">{{ deliveryStats.avgDeliveryTime }} min</span>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import AppHeader from '@/components/Shared/AppHeader.vue';
import AppFooter from '@/components/Shared/AppFooter.vue';

const currentBalance = ref(0.00);
const lastPayoutDate = ref('N/A');
const statsPeriod = ref('last7days');
const deliveryStats = ref({
  totalDeliveries: 0,
  totalEarned: 0.00,
  avgEarningsPerDelivery: 0.00,
  avgDeliveryTime: 0,
});
const loadingStats = ref(true);

const fetchEarningsSummary = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  currentBalance.value = 320.50;
  lastPayoutDate.value = '2026-02-08';
};

const fetchDeliveryStats = async (period) => {
  loadingStats.value = true;
  await new Promise(resolve => setTimeout(resolve, 500));
  if (period === 'today') {
    deliveryStats.value = {
      totalDeliveries: 5, totalEarned: 150.00, avgEarningsPerDelivery: 30.00, avgDeliveryTime: 25,
    };
  } else if (period === 'last7days') {
    deliveryStats.value = {
      totalDeliveries: 35, totalEarned: 1200.00, avgEarningsPerDelivery: 34.28, avgDeliveryTime: 28,
    };
  } else if (period === 'thisMonth') {
    deliveryStats.value = {
      totalDeliveries: 100, totalEarned: 3500.00, avgEarningsPerDelivery: 35.00, avgDeliveryTime: 27,
    };
  } else { // allTime
    deliveryStats.value = {
      totalDeliveries: 500, totalEarned: 18000.00, avgEarningsPerDelivery: 36.00, avgDeliveryTime: 26,
    };
  }
  loadingStats.value = false;
};

const initiatePayout = () => {
  if (currentBalance.value > 0) {
    alert(`Initiating payout of R${currentBalance.value.toFixed(2)}. Funds will be transferred shortly.`);
    // In real app, trigger backend API for payout
    currentBalance.value = 0.00;
    lastPayoutDate.value = new Date().toLocaleDateString('en-ZA');
  } else {
    alert('No funds available for payout.');
  }
};

watch(statsPeriod, (newPeriod) => {
  fetchDeliveryStats(newPeriod);
});

onMounted(() => {
  fetchEarningsSummary();
  fetchDeliveryStats(statsPeriod.value);
});
</script>

<style scoped>
.driver-earnings-page {
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
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

.welcome-banner.driver-theme {
  background-color: var(--color-tertiary-blue);
  color: var(--color-text-light);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
}

.welcome-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-dark);
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-border-light);
}

.current-earnings-section,.delivery-stats-section {
  background-color: var(--color-text-light);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.balance-card {
  text-align: center;
  padding: 1rem 0;
}

.balance-label {
  font-size: 1rem;
  color: var(--color-grey-text);
  margin-bottom: 0.5rem;
}

.balance-amount {
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-tertiary-blue); /* Driver theme color */
  display: block;
  margin-bottom: 1.5rem;
}

.btn-primary.payout-btn {
  background-color: var(--color-primary-orange); /* Use primary orange for action */
  color: var(--color-text-light);
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-primary.payout-btn:hover {
  background-color: #e06a30;
}

.last-payout {
  font-size: 0.85rem;
  color: var(--color-grey-text);
}

.stats-filter { /* Uses flex-between */
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-label {
  font-weight: bold;
  color: var(--color-text-dark);
}

.filter-select {
  flex-grow: 1;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--color-text-light);
  color: var(--color-text-dark);
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%23000000%22%20d%3D%22M287%2C114.7L158.4%2C243.3c-2.4%2C2.4-5.4%2C3.6-8.7%2C3.6s-6.3-1.2-8.7-3.6L5.4%2C114.7c-4.8-4.8-4.8-12.5%2C0-17.3c4.8-4.8%2C12.5-4.8%2C17.3%2C0l129.5%2C129.6L269.7%2C97.4c4.8-4.8%2C12.5-4.8%2C17.3%2C0C291.9%2C102.2%2C291.9%2C109.9%2C287%2C114.7z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
.filter-select:focus {
  border-color: var(--color-tertiary-blue);
  outline: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.stat-item-card {
  background-color: var(--color-background-light);
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-item-card.total {
  background-color: var(--color-tertiary-blue);
  color: var(--color-text-light);
}

.stat-item-card.total.stat-label {
  color: rgba(255, 255, 255, 0.8);
}

.stat-item-card.total.stat-value {
  color: var(--color-text-light);
}

/* Spinner and text-muted styles repeated for context */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid var(--color-primary-orange);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.text-muted { color: var(--color-grey-text); }
.mt-3 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 1.5rem; }
</style>