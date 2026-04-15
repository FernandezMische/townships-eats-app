<!-- Frontend/src/views/Customer/OrderTrackingPage.vue -->
<template>
  <div class="order-tracking-page">
    <div class="page-card tracking-card">
      <BackButton class="mb-20">Back to Home</BackButton>
      <h2 class="text-center mb-20">Order Tracking</h2>
      
      <div v-if="order">
        <p class="text-center order-id-text">Order ID: <span class="order-id">{{ order.id }}</span></p>
        <p class="text-center order-status-text">Status: <span :class="['order-status', order.status.toLowerCase().replace(' ', '-') ]">{{ order.status }}</span></p>

        <div class="timeline mt-40">
          <div v-for="(stage, index) in orderStages" :key="index" :class="['timeline-item', { 'active': isStageActive(stage.status) }]">
            <div :class="['timeline-dot', { 'active': isStageActive(stage.status) }]"></div>
            <div class="timeline-content">
              <h4>{{ stage.title }}</h4>
              <p v-if="isStageActive(stage.status)">{{ stage.description }}</p>
              <p v-else class="text-muted">Waiting...</p>
            </div>
          </div>
        </div>

        <div class="order-details mt-40">
          <h3>Order Details</h3>
          <div v-for="item in order.items" :key="item.id" class="order-item flex-between">
            <span>{{ item.quantity }}x {{ item.name }}</span>
            <span>R{{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="total-summary flex-between">
            <span>Total:</span>
            <span>R{{ order.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <p>Loading order details...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import BackButton from '../../components/Shared/BackButton.vue'; // Import BackButton

const route = useRoute();
const order = ref(null);

const dummyOrders = [
  {
    id: 'TX20240212-001',
    status: 'Preparing',
    items: [
      { id: 1, name: 'Kota Special', price: 60.00, quantity: 1 },
      { id: 2, name: 'Spicy Chicken Wings (6pc)', price: 95.00, quantity: 1 },
    ],
    total: 180.00, // 60 + 95 + 25 (delivery fee)
  },
  {
    id: 'TX20240212-002',
    status: 'Delivered',
    items: [
      { id: 1, name: 'Malva Pudding', price: 45.00, quantity: 2 },
    ],
    total: 115.00, // 90 + 25
  }
];

const orderStages = ref([
  { status: 'Placed', title: 'Order Placed', description: 'Your order has been received.' },
  { status: 'Preparing', title: 'Preparing Food', description: 'The vendor is now preparing your delicious meal.' },
  { status: 'Picked Up', title: 'Out for Delivery', description: 'Your order has been picked up by our driver!' },
  { status: 'Delivered', title: 'Delivered', description: 'Your order has been delivered! Enjoy your meal!' },
]);

const isStageActive = computed(() => (stageStatus) => {
  const currentStatusIndex = orderStages.value.findIndex(s => s.status === order.value?.status);
  const stageIndex = orderStages.value.findIndex(s => s.status === stageStatus);
  return stageIndex <= currentStatusIndex;
});

onMounted(() => {
  const orderId = route.params.id;
  order.value = dummyOrders.find(o => o.id === orderId);
  // Simulate progress for an active order
  if (order.value && (order.value.status === 'Placed' || order.value.status === 'Preparing' || order.value.status === 'Picked Up')) {
    let currentStage = orderStages.value.findIndex(s => s.status === order.value.status);
    const interval = setInterval(() => {
      if (!order.value) return; // Prevent errors if order is nullified
      if (currentStage < orderStages.value.length - 1) { // Advance until the last stage
        currentStage++;
        order.value.status = orderStages.value[currentStage].status;
        if (order.value.status === 'Delivered') {
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 5000); // Update status every 5 seconds for demo
  }
});
</script>

<style scoped>
/* Keep existing styles */
.order-tracking-page {
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
  padding: 20px;
}

.tracking-card {
  max-width: 700px;
  width: 100%;
}

.mb-20 {
  margin-bottom: 20px;
}

.order-id-text,.order-status-text {
  font-size: 1.1em;
  margin-bottom: 5px;
}

.order-id {
  font-weight: bold;
  color: var(--color-primary-orange);
}

.order-status {
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 5px;
  color: white;
}

.order-status.placed { background-color: #007bff; } /* Blue */
.order-status.preparing { background-color: var(--color-primary-orange); } /* Orange */
.order-status.picked-up { background-color: #ffc107; color: var(--color-text-dark); } /* Yellow */
.order-status.delivered { background-color: var(--color-secondary-green); } /* Green */

.timeline {
  position: relative;
  margin: 30px 0;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--color-border-light);
}

.timeline-item {
  position: relative;
  margin-bottom: 25px;
  text-align: left;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 5px;
  width: 20px;
  height: 20px;
  background-color: var(--color-border-light);
  border-radius: 50%;
  border: 3px solid var(--color-text-light);
  transform: translateX(-50%);
}

.timeline-item.active.timeline-dot { /* Corrected selector */
  background-color: var(--color-primary-orange);
  border-color: var(--color-primary-orange);
}

.timeline-content {
  margin-left: 20px;
}

.timeline-content h4 {
  margin: 0;
  color: var(--color-grey-text);
}

.timeline-item.active.timeline-content h4 { /* Corrected selector */
  color: var(--color-text-dark);
}

.timeline-content p {
  margin: 5px 0 0;
  font-size: 0.9em;
  color: var(--color-grey-text);
}

.text-muted {
  color: #ccc;
}

.order-details {
  border-top: 1px solid var(--color-border-light);
  padding-top: 20px;
}

.order-details h3 {
  margin-bottom: 15px;
  color: var(--color-text-dark);
  text-align: left;
}

.order-item {
  margin-bottom: 10px;
  font-size: 1em;
  color: var(--color-grey-text);
}

.total-summary {
  border-top: 1px dashed var(--color-border-light);
  padding-top: 15px;
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
  color: var(--color-primary-orange);
}
</style>