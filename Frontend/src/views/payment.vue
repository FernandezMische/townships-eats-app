<template>
  <div class="payment-container">
    <h1>Checkout</h1>
    
    <!-- Success/Cancel Messages -->
    <div v-if="paymentStatus === 'success'" class="success-page">
      <div class="success-card">
        <div class="success-icon">✅</div>
        <h2>Payment Successful!</h2>
        <p>Your order #{{ orderId }} has been confirmed.</p>
        <p>Redirecting to home in {{ countdown }} seconds...</p>
        <router-link to="/customer/home" class="btn-primary">Click here if not redirected</router-link>
      </div>
    </div>
    
    <div v-else-if="paymentStatus === 'cancel'" class="cancel-page">
      <div class="cancel-card">
        <div class="cancel-icon">❌</div>
        <h2>Payment Cancelled</h2>
        <p>Your payment was cancelled. No charges were made.</p>
        <p>Redirecting to cart in {{ countdown }} seconds...</p>
        <router-link to="/cart" class="btn-primary">Return to Cart</router-link>
      </div>
    </div>
    
    <!-- Normal Checkout Flow -->
    <div v-else>
      <div v-if="loading" class="text-center">
        <p>Loading your cart...</p>
      </div>
      
      <div v-else>
        <div class="order-summary">
          <h3>Order Summary</h3>
          <div v-if="!cart.items || cart.items.length === 0" class="text-center">
            <p>Your cart is empty. <RouterLink to="/customer/home">Go back shopping</RouterLink></p>
          </div>
          <div v-else>
            <div v-for="item in cart.items" :key="item.id" class="summary-item">
              <span>{{ item.name }} x{{ item.quantity }}</span>
              <span>R{{ (Number(item.unit_price) * Number(item.quantity)).toFixed(2) }}</span>
            </div>
            <div class="address-section">
              <label for="deliveryAddress"><strong>Delivery Address</strong></label>
              <textarea
                id="deliveryAddress"
                v-model.trim="deliveryAddress"
                rows="3"
                placeholder="Enter your delivery address"
              ></textarea>
            </div>
            <div class="summary-line">
              <span>Subtotal:</span>
              <span>R{{ Number(cart.subtotal || 0).toFixed(2) }}</span>
            </div>
            <div class="summary-line">
              <span>Delivery Fee:</span>
              <span>R{{ Number(cart.delivery_fee || 25.00).toFixed(2) }}</span>
            </div>
            <div class="summary-total">
              <strong>Total: R{{ calculateTotal().toFixed(2) }}</strong>
            </div>
          </div>
        </div>
        
        <div v-if="success" class="success">{{ success }}</div>
        <div v-if="error" class="error">{{ error }}</div>

        <button v-if="cart.items && cart.items.length > 0 && !success" @click="completeOrder" :disabled="loading">
          {{ loading ? "Processing..." : `Complete Order - R${calculateTotal().toFixed(2)}` }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
  name: "PaymentPage",
  components: { RouterLink },
  data() {
    return {
      loading: true,
      success: null,
      error: null,
      cart: { items: [], subtotal: 0, delivery_fee: 25.00, total: 0 },
      deliveryAddress: '',
      paymentStatus: null,
      orderId: null,
      countdown: 5
    };
  },
  async created() {
    const orderIdParam = this.$route.query.order_id;
    const paymentStatusParam = this.$route.query.payment_status;
    const cancelParam = this.$route.query.cancel;
    
    if (orderIdParam && paymentStatusParam === 'COMPLETE') {
      this.paymentStatus = 'success';
      this.orderId = orderIdParam;
      localStorage.removeItem('cart');
      this.startCountdown();
      return;
    } else if (cancelParam || this.$route.query.cancel === 'true') {
      this.paymentStatus = 'cancel';
      this.startCountdown();
      return;
    } else {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
        return;
      }
      await Promise.all([this.fetchCart(), this.fetchProfileAddress()]);
    }
  },
  methods: {
    startCountdown() {
      const interval = setInterval(() => {
        if (this.countdown <= 1) {
          clearInterval(interval);
          if (this.paymentStatus === 'success') {
            const token = localStorage.getItem('token');
            if (token && !localStorage.getItem('userRole')) {
              try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const role = payload.role || 'customer';
                localStorage.setItem('userRole', role);
                console.log('✅ Set userRole to:', role);
              } catch (e) {
                localStorage.setItem('userRole', 'customer');
              }
            }
            this.$router.push('/customer/home');
          } else if (this.paymentStatus === 'cancel') {
            this.$router.push('/cart');
          }
        } else {
          this.countdown--;
        }
      }, 1000);
    },
    submitPayFastForm(url, fields) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = url;

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value ?? '';
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    },
    async fetchCart() {
      try {
        const token = localStorage.getItem('token');
        const API_URL = import.meta.env.VITE_API_URL || 'https://townships-eats-backend.onrender.com/api';
        const response = await axios.get(`${API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.cart = response.data.data;
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
        this.error = 'Failed to load cart';
      } finally {
        this.loading = false;
      }
    },
    async fetchProfileAddress() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const API_URL = import.meta.env.VITE_API_URL || 'https://townships-eats-backend.onrender.com/api';
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data?.success) {
          const profileAddress = response.data.data?.address || '';
          this.deliveryAddress = profileAddress;

          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...currentUser,
              address: profileAddress
            })
          );
        }
      } catch (err) {
        console.error('Error fetching profile address:', err);
      }
    },
    calculateTotal() {
      const subtotal = Number(this.cart.subtotal || 0);
      const deliveryFee = Number(this.cart.delivery_fee || 25.00);
      return subtotal + deliveryFee;
    },
    async completeOrder() {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (!token) {
          this.$router.push('/login');
          return;
        }

        if (!user.email) {
          this.error = 'Missing user email. Please log in again.';
          this.loading = false;
          return;
        }

        if (!this.deliveryAddress) {
          this.error = 'Please add a delivery address before checkout.';
          this.loading = false;
          return;
        }

        const API_URL = import.meta.env.VITE_API_URL || 'https://townships-eats-backend.onrender.com/api';
        
        const orderResponse = await axios.post(`${API_URL}/orders`, {
          delivery_address: this.deliveryAddress
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!orderResponse.data?.success) {
          throw new Error('Failed to create order');
        }

        const orderId = orderResponse.data.data?.order_id;
        const orderTotal = Number(orderResponse.data.data?.total || this.calculateTotal());
        const [firstName, ...restName] = String(user.username || 'Customer').trim().split(' ');
        const lastName = restName.join(' ');

        const payfastResponse = await axios.post(`${API_URL}/payfast/pay`, {
          first_name: firstName || 'Customer',
          last_name: lastName || '',
          email: user.email,
          amount: orderTotal,
          item_name: `Order #${orderId}`,
          item_description: `Kasi Eats order ${orderId}`,
          order_id: orderId
        });

        if (!payfastResponse.data?.success || !payfastResponse.data?.url || !payfastResponse.data?.data) {
          throw new Error(payfastResponse.data?.error || 'Failed to initiate PayFast');
        }

        this.success = 'Redirecting to PayFast...';
        this.submitPayFastForm(payfastResponse.data.url, payfastResponse.data.data);
      } catch (err) {
        console.error("Order error:", err);
        this.error = `Error: ${err.response?.data?.error || err.message}`;
        this.loading = false;
      } finally {
        if (this.success !== 'Redirecting to PayFast...') {
          this.loading = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.payment-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: white;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.order-summary {
  text-align: left;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.address-section {
  margin: 15px 0;
}

.address-section label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

.address-section textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  resize: vertical;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #ddd;
  text-align: right;
  font-size: 1.2em;
}

button {
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: #f44336;
  margin-top: 10px;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
  border: 1px solid #f44336;
}

.success {
  color: #4caf50;
  margin-top: 10px;
  padding: 10px;
  background-color: #e8f5e8;
  border-radius: 4px;
  border: 1px solid #4caf50;
  font-weight: bold;
}

.text-center {
  text-align: center;
}

/* Success/Cancel Pages */
.success-page, .cancel-page {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-card, .cancel-card {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.success-icon, .cancel-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.success-card h2 {
  color: #4caf50;
  margin-bottom: 15px;
}

.cancel-card h2 {
  color: #f44336;
  margin-bottom: 15px;
}

.btn-primary {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #45a049;
}
</style>
