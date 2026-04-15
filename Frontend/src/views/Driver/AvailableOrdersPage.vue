<template>
  <div class="available-orders-page">
    <AppHeader title="Available Orders" show-back-button />

    <main class="main-content container">
      <div class="welcome-banner driver-theme text-center">
        <h1 class="welcome-title">Orders Ready for Action!</h1>
        <p class="welcome-subtitle">Accept new deliveries or continue your active routes.</p>
      </div>

      <div class="orders-filter mb-4">
        <label for="orderTypeFilter" class="filter-label">Show:</label>
        <select id="orderTypeFilter" v-model="filterType" class="filter-select">
          <option value="available">Available for Acceptance</option>
          <option value="active">My Active Deliveries</option>
        </select>
      </div>

      <div v-if="loading" class="loading-state text-center">
        <div class="spinner"></div>
        <p class="mt-3 text-muted">Loading orders...</p>
      </div>
      <div v-else-if="filteredOrders.length === 0" class="empty-state text-center">
        <h3 class="text-muted mb-2">No {{ filterType === 'available'? 'new orders' : 'active deliveries' }} found.</h3>
        <p class="text-muted">Keep an eye out, or try adjusting your filter.</p>
      </div>
      <div v-else class="orders-list-grid">
        <OrderCard
          v-for="order in filteredOrders"
          :key="order.id"
          :order="order"
          role="driver"
          @action="handleDriverOrderAction"
        />
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import AppHeader from '@/components/Shared/AppHeader.vue';
import AppFooter from '@/components/Shared/AppFooter.vue';
import OrderCard from '@/components/Shared/OrderCard.vue';

const allOrders = ref([]); // Stores all orders, including available and active
const loading = ref(true);
const filterType = ref('available'); // 'available' or 'active'

const driverId = 'driver123'; // Simulating a logged-in driver

const filteredOrders = computed(() => {
  if (filterType.value === 'available') {
    // Orders not yet accepted by this driver
    return allOrders.value.filter(order => order.status === 'placed' &&!order.assignedDriverId);
  } else { // 'active'
    // Orders accepted by this driver and not yet delivered
    return allOrders.value.filter(order =>
      order.assignedDriverId === driverId &&
      (order.status === 'accepted' || order.status === 'preparing' || order.status === 'picked_up' || order.status === 'out_for_delivery')
    );
  }
});

const fetchDriverOrders = async () => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulate API delay
  allOrders.value = [
    {
      id: 'DORD001', customerName: 'Lindiwe N.', vendorName: 'Township Grill', status: 'placed',
      items: [{ id: 101, name: 'Chicken Gatsby', quantity: 1 }], total: 80.00,
      pickupLocation: 'Vendor Address 1', deliveryLocation: 'Customer Address 1', assignedDriverId: null,
    },
    {
      id: 'DORD002', customerName: 'Zola M.', vendorName: 'Mama\'s Kitchen', status: 'placed',
      items: [{ id: 201, name: 'Vetkoek & Mince', quantity: 2 }], total: 70.00,
      pickupLocation: 'Vendor Address 2', deliveryLocation: 'Customer Address 2', assignedDriverId: null,
    },
    {
      id: 'DORD003', customerName: 'Sipho K.', vendorName: 'Spicy Corner', status: 'accepted',
      items: [{ id: 301, name: 'Lamb Curry', quantity: 1 }], total: 120.00,
      pickupLocation: 'Vendor Address 3', deliveryLocation: 'Customer Address 3', assignedDriverId: driverId,
    },
    {
      id: 'DORD004', customerName: 'Thando P.', vendorName: 'Township Grill', status: 'picked_up',
      items: [{ id: 102, name: 'Boerewors Roll', quantity: 1 }], total: 50.00,
      pickupLocation: 'Vendor Address 1', deliveryLocation: 'Customer Address 4', assignedDriverId: driverId,
    },
    {
      id: 'DORD005', customerName: 'Amahle G.', vendorName: 'Mama\'s Kitchen', status: 'out_for_delivery',
      items: [{ id: 202, name: 'Dombolo & Curried Chicken', quantity: 1 }], total: 90.00,
      pickupLocation: 'Vendor Address 2', deliveryLocation: 'Customer Address 5', assignedDriverId: driverId,
    },
    {
      id: 'DORD006', customerName: 'Lerato R.', vendorName: 'Spicy Corner', status: 'delivered',
      items: [{ id: 302, name: 'Samosas', quantity: 5 }], total: 40.00,
      pickupLocation: 'Vendor Address 3', deliveryLocation: 'Customer Address 6', assignedDriverId: driverId,
    },
  ];
  loading.value = false;
};

const handleDriverOrderAction = ({ orderId, action }) => {
  console.log(`Driver action on Order ${orderId}: ${action}`);
  const orderIndex = allOrders.value.findIndex(order => order.id === orderId);
  if (orderIndex!== -1) {
    const order = allOrders.value[orderIndex];
    if (action === 'Accept Order') {
      order.status = 'accepted';
      order.assignedDriverId = driverId;
      alert(`Order ${orderId} accepted! Now proceed to pickup.`);
    } else if (action === 'Pick Up') {
      order.status = 'picked_up';
      alert(`Order ${orderId} picked up! Now deliver to customer.`);
    } else if (action === 'Deliver Order') { // This action would typically be on a dedicated OrderDetail page
      order.status = 'delivered';
      alert(`Order ${orderId} delivered!`);
    }
  }
};

onMounted(() => {
  fetchDriverOrders();
});

watch(filterType, () => {
  // Re-fetch or re-filter orders if necessary, for now just re-renders computed
});
</script>

<style scoped>
.available-orders-page {
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
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-banner.driver-theme {
  background-color: var(--color-tertiary-blue); /* Driver theme color */
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

.orders-filter {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: var(--color-text-light);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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

.loading-state,.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background-color: var(--color-text-light);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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

.text-muted { color: var(--color-grey-text); }
.mb-2 { margin-bottom: 1rem; }
.mt-3 { margin-top: 1.5rem; }

.orders-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}
</style>