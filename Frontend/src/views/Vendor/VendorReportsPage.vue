<!-- Frontend/src/views/Vendor/VendorReportsPage.vue -->
<template>
  <div class="vendor-reports-page">
    <div class="page-card reports-card">
      <BackButton class="mb-20">Back to Dashboard</BackButton>
      <h2 class="text-center mb-20">Earnings Reports</h2>

      <p class="text-center intro-text mb-40">Overview of your sales and earnings.</p>

      <div class="report-summary">
        <div class="summary-item">
          <h3>Total Sales (Month)</h3>
          <p class="summary-value">R{{ totalSalesMonth.toFixed(2) }}</p>
        </div>
        <div class="summary-item">
          <h3>Total Orders (Month)</h3>
          <p class="summary-value">{{ totalOrdersMonth }}</p>
        </div>
        <div class="summary-item">
          <h3>Avg. Order Value</h3>
          <p class="summary-value">R{{ avgOrderValue.toFixed(2) }}</p>
        </div>
      </div>

      <h3 class="mt-40 mb-20 text-center">Recent Transactions</h3>
      <div class="transactions-list">
        <div v-for="transaction in transactions" :key="transaction.id" class="transaction-item flex-between">
          <span>{{ transaction.date }} - Order #{{ transaction.orderId }}</span>
          <span class="transaction-amount">R{{ transaction.amount.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BackButton from '../../components/Shared/BackButton.vue';

const totalSalesMonth = ref(12450.50);
const totalOrdersMonth = ref(155);

const transactions = ref([
  { id: 1, orderId: 'VORD101', date: '2026-02-10', amount: 145.00 },
  { id: 2, orderId: 'VORD102', date: '2026-02-10', amount: 75.00 },
  { id: 3, orderId: 'VORD103', date: '2026-02-09', amount: 85.00 },
  { id: 4, orderId: 'VORD104', date: '2026-02-09', amount: 110.00 },
  { id: 5, orderId: 'VORD105', date: '2026-02-08', amount: 90.00 },
]);

const avgOrderValue = computed(() => {
  if (totalOrdersMonth.value === 0) return 0;
  return totalSalesMonth.value / totalOrdersMonth.value;
});
</script>

<style scoped>
.vendor-reports-page {
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
  padding: 20px;
}

.reports-card {
  max-width: 800px;
  width: 100%;
}

.intro-text {
  color: var(--color-grey-text);
  font-style: italic;
}

.report-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
  text-align: center;
}

.summary-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px;
}

.summary-item h3 {
  color: var(--color-grey-text);
  margin-bottom: 10px;
  font-size: 1.1em;
}

.summary-value {
  font-size: 2.2em;
  font-weight: bold;
  color: var(--color-primary-orange);
}

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.transaction-item {
  background-color: var(--color-background-light);
  border-radius: 5px;
  padding: 10px 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  font-size: 0.95em;
  color: var(--color-text-dark);
}

.transaction-amount {
  font-weight: bold;
  color: var(--color-primary-orange);
}
</style>