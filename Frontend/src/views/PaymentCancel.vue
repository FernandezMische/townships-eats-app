<template>
  <div class="payment-cancel-container">
    <div class="cancel-card">
      <div class="cancel-icon">✗</div>
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. No charges have been made to your account.</p>
      <div class="button-group">
        <router-link to="/cart" class="btn-cart">Return to Cart</router-link>
        <router-link to="/customer/home" class="btn-home">Continue Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-cancel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%);
  padding: 20px;
}

.cancel-card {
  background: white;
  padding: 50px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  max-width: 500px;
  width: 100%;
}

.cancel-icon {
  width: 80px;
  height: 80px;
  background: #ff4444;
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

.btn-cart, .btn-home {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-cart {
  background: #ff6b6b;
  color: white;
}

.btn-cart:hover {
  background: #ff5252;
  transform: translateY(-2px);
}

.btn-home {
  background: #4caf50;
  color: white;
}

.btn-home:hover {
  background: #45a049;
  transform: translateY(-2px);
}
</style>
