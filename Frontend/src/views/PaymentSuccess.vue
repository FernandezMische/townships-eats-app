<template>
  <div class="payment-success-container">
    <div class="success-card">
      <div class="success-icon">✓</div>
      <h1>Payment Successful!</h1>
      <p>Your order has been confirmed and will be delivered soon.</p>
      <div class="button-group">
        <router-link to="/customer/home" class="btn-home">Return to Home</router-link>
        <router-link to="/customer/orders" class="btn-orders">View My Orders</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  // Clear cart from localStorage after successful payment
  localStorage.removeItem('cart');
  
  // Auto redirect to home after 5 seconds
  setTimeout(() => {
    router.push('/customer/home');
  }, 5000);
});
</script>

<style scoped>
.payment-success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.success-card {
  background: white;
  padding: 50px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  max-width: 500px;
  width: 100%;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  margin: 0 auto 20px;
}

h1 {
  color: #333;
  margin-bottom: 15px;
}

p {
  color: #666;
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-home, .btn-orders {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-home {
  background: #4caf50;
  color: white;
}

.btn-home:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.btn-orders {
  background: #2196f3;
  color: white;
}

.btn-orders:hover {
  background: #0b7dda;
  transform: translateY(-2px);
}
</style>
