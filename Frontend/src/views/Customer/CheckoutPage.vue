<template>
  <div class="checkout-page">
    <AppHeader title="Checkout" show-back-button />

    <main class="main-content container">
      <h2 class="section-title mb-4">Delivery Details</h2>
      <div class="delivery-details-card">
        <div class="detail-row flex-between">
          <span class="detail-label">Address:</span>
          <div class="detail-value text-right">
            <span>123 Main Street, Cape Town</span>
            <button class="change-btn">Change</button>
          </div>
        </div>
        <div class="detail-row flex-between">
          <span class="detail-label">Delivery Time:</span>
          <div class="detail-value text-right">
            <span>ASAP (20-30 min)</span>
            <button class="change-btn">Change</button>
          </div>
        </div>
        <div class="detail-row flex-between">
          <span class="detail-label">Notes:</span>
          <div class="detail-value text-right">
            <span>Leave at door</span>
            <button class="change-btn">Edit</button>
          </div>
        </div>
      </div>

      <h2 class="section-title mb-4">Payment Method</h2>
      <div class="payment-method-card">
        <div class="detail-row flex-between">
          <span class="detail-label">Card:</span>
          <div class="detail-value text-right">
            <span>Visa ending in 1234</span>
            <button class="change-btn">Change</button>
          </div>
        </div>
        <!-- Simulated Payment System Note -->
        <p class="simulated-payment-note">
          Note: This is a simulated payment system. Your order will be placed without actual billing.
        </p>
      </div>

      <h2 class="section-title mb-4">Your Order</h2>
      <div class="order-summary-card mb-4">
        <div class="order-items-summary">
          <div v-for="item in cartItems" :key="item.id" class="summary-item flex-between">
            <span>{{ item.quantity }}x {{ item.name }}</span>
            <span>R{{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        <div class="summary-breakdown">
          <div class="summary-line flex-between">
            <span>Subtotal:</span>
            <span>R{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-line flex-between">
            <span>Delivery Fee:</span>
            <span>R{{ deliveryFee.toFixed(2) }}</span>
          </div>
          <div class="summary-line flex-between total">
            <span>Total:</span>
            <span>R{{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <button class="btn-primary place-order-btn" @click="placeOrder">
        Place Order
      </button>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/Shared/AppHeader.vue';
import AppFooter from '@/components/Shared/AppFooter.vue';

const router = useRouter();

// Dummy data (would come from cart store)
const cartItems = ref([
  { id: 101, name: 'Chicken Gatsby', price: 65.00, quantity: 2 },
  { id: 301, name: 'Coca-Cola (300ml)', price: 15.00, quantity: 3 },
]);
const deliveryFee = ref(15.00);

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const cartTotal = computed(() => {
  return subtotal.value + deliveryFee.value;
});

const placeOrder = () => {
  alert('Order Placed! Simulating successful order placement.');
  // In a real app: send order to backend, clear cart, navigate to order tracking
  router.push('/customer/order/mock-order-id/track');
};
</script>

<style scoped>
.checkout-page {
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
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-dark);
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-border-light);
}

/* Card styles for delivery details, payment, order summary */
.delivery-details-card,
.payment-method-card,
.order-summary-card {
  background-color: var(--color-text-light);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.detail-row { /* Uses flex-between */
  padding: 0.7rem 0;
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: var(--color-grey-text);
}

.detail-value span {
  margin-bottom: 0.2rem;
}

.change-btn {
  background: none;
  border: 1px solid var(--color-primary-orange);
  color: var(--color-primary-orange);
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.change-btn:hover {
  background-color: var(--color-primary-orange);
  color: var(--color-text-light);
}

.simulated-payment-note {
  font-size: 0.9rem;
  color: var(--color-accent-red);
  margin-top: 1rem;
  text-align: center;
}

.order-items-summary {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border-light);
}

.summary-item { /* Uses flex-between */
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: var(--color-grey-dark);
}
.summary-item:last-child {
  margin-bottom: 0;
}

.summary-breakdown {
  padding-top: 1rem;
}

.summary-line { /* Uses flex-between */
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: var(--color-grey-dark);
}

.summary-line.total {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-text-dark);
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--color-border-light);
}

.place-order-btn {
  background-color: var(--color-primary-orange);
  color: var(--color-text-light);
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}
.place-order-btn:hover {
  background-color: #e06a30;
}
</style>