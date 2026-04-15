<template>
  <div class="order-history-page">
    <AppHeader title="My Orders" show-back-button />

    <main class="main-content container">
      <div v-if="loading" class="loading-state text-center">
        <div class="spinner"></div>
        <p class="mt-3 text-muted">Loading your order history...</p>
      </div>
      <div v-else-if="orders.length === 0" class="empty-state text-center">
        <h3 class="text-muted mb-2">No orders found yet!</h3>
        <p class="text-muted mb-4">Start browsing delicious meals to place your first order.</p>
        <button class="btn-primary" @click="router.push('/customer/home')">
          Browse Now
        </button>
      </div>
      <div v-else>
        <h2 class="section-title">Past Orders</h2>
        <OrderCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
          role="customer"
          @action="handleOrderAction"
        />
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/Shared/AppHeader.vue';
import AppFooter from '@/components/Shared/AppFooter.vue';
import OrderCard from '@/components/Shared/OrderCard.vue';

const router = useRouter();
const orders = ref([]);
const loading = ref(true);

const fetchOrderHistory = async () => {
  loading.value = true;
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  orders.value = [
    {
      id: 'ORD001',
      vendorName: 'Township Grill',
      status: 'delivered',
      items: [
        { id: 1, name: 'Chicken Gatsby', quantity: 1, name: 'Chicken Gatsby' },
        { id: 2, name: 'Chips', quantity: 1, name: 'Chips' },
      ],
      total: 80.00,
      deliveryDate: '2026-02-10',
    },
    {
      id: 'ORD002',
      vendorName: 'Mama\'s Kitchen',
      status: 'delivered',
      items: [
        { id: 3, name: 'Vetkoek & Mince', quantity: 2, name: 'Vetkoek & Mince' },
        { id: 4, name: 'Coke', quantity: 1, name: 'Coke' },
        { id: 5, name: 'Something Else', quantity: 1, name: 'Something Else' },
        { id: 6, name: 'Another Item', quantity: 1, name: 'Another Item' },
      ],
      total: 105.00,
      deliveryDate: '2026-02-05',
    },
    {
      id: 'ORD003',
      vendorName: 'Spicy Corner',
      status: 'cancelled',
      items: [
        { id: 7, name: 'Lamb Curry', quantity: 1, name: 'Lamb Curry' },
      ],
      total: 120.00,
      deliveryDate: '2026-02-01',
    },
     {
      id: 'ORD004',
      vendorName: 'Township Grill',
      status: 'placed',
      items: [
        { id: 1, name: 'Chicken Gatsby', quantity: 1, name: 'Chicken Gatsby' },
        { id: 2, name: 'Chips', quantity: 1, name: 'Chips' },
      ],
      total: 80.00,
      deliveryDate: '2026-02-10',
    },
    // More orders...
  ];
  loading.value = false;
};

const handleOrderAction = ({ orderId, action }) => {
  console.log(`Order ${orderId}: Action - ${action}`);
  if (action === 'Reorder') {
    // Implement reorder logic, e.g., add items to cart and navigate to cart
    alert(`Reordering functionality for Order ${orderId} not yet implemented.`);
  }
};

onMounted(() => {
  fetchOrderHistory();
});
</script>

<style scoped>
.order-history-page {
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
  min-height: 100vh;
  background-color: var(--color-background-light);
}

.main-content {
  flex-grow: 1;
  padding: 1rem;
  padding-bottom: 70px; /* Space for fixed footer */
  max-width: 1200px;
  margin: 0 auto;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

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

.text-muted {
  color: var(--color-grey-text);
}

.mb-2 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 2rem; }
.mt-3 { margin-top: 1.5rem; }

.btn-primary { /* Reusing btn-primary style from LoginPage */
  background-color: var(--color-primary-orange);
  color: var(--color-text-light);
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #e06a30; /* Slightly darker orange */
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-dark);
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-border-light);
}
</style>