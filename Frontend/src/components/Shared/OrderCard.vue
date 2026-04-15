<template>
  <div class="order-card" @click="goToOrderDetail">
    <div class="order-header flex-between">
      <h3 class="order-title">Order #{{ order.id }}</h3>
      <span class="order-status" :class="orderStatusClass">{{ formattedStatus }}</span>
    </div>

    <p class="order-meta">
      {{ order.vendorName }} <span v-if="order.customerName"> &bull; {{ order.customerName }}</span>
    </p>

    <ul class="order-items-list">
      <li v-for="item in order.items.slice(0, 2)" :key="item.id" class="order-item">
        {{ item.quantity }}x {{ item.name }}
      </li>
      <li v-if="order.items.length > 2" class="order-item-count">
        + {{ order.items.length - 2 }} more items
      </li>
    </ul>

    <div class="order-footer flex-between">
      <span class="order-total">Total: R{{ order.total.toFixed(2) }}</span>
      <button v-if="showActionButton" :class="['action-button', actionButtonVariant]" @click.stop="handleAction">
        {{ actionButtonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  order: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        typeof value.id === 'string' &&
        typeof value.vendorName === 'string' &&
        typeof value.status === 'string' &&
        Array.isArray(value.items) &&
        typeof value.total === 'number'
      );
    },
  },
  role: { // 'customer', 'vendor', 'driver' - to determine action and navigation
    type: String,
    default: 'customer',
  },
});

const emit = defineEmits(['action']);

const router = useRouter();

const formattedStatus = computed(() => {
  const statusMap = {
    placed: 'Placed',
    accepted: 'Accepted',
    preparing: 'Preparing',
    picked_up: 'Picked Up',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };
  return statusMap[props.order.status] || props.order.status;
});

const orderStatusClass = computed(() => {
  return {
    'status-placed': props.order.status === 'placed',
    'status-accepted': props.order.status === 'accepted',
    'status-preparing': props.order.status === 'preparing',
    'status-picked-up': props.order.status === 'picked_up',
    'status-out-for-delivery': props.order.status === 'out_for_delivery',
    'status-delivered': props.order.status === 'delivered',
    'status-cancelled': props.order.status === 'cancelled',
  };
});

const showActionButton = computed(() => {
  // Example logic:
  if (props.role === 'vendor' && props.order.status === 'placed') return true;
  if (props.role === 'driver' && props.order.status === 'accepted') return true;
  if (props.role === 'customer' && props.order.status === 'delivered') return true; // Reorder
  return false;
});

const actionButtonText = computed(() => {
  // Example logic:
  if (props.role === 'vendor' && props.order.status === 'placed') return 'Accept Order';
  if (props.role === 'driver' && props.order.status === 'accepted') return 'Pick Up';
  if (props.role === 'customer' && props.order.status === 'delivered') return 'Reorder';
  return '';
});

const actionButtonVariant = computed(() => {
  // Custom class for styling buttons based on action type
  if (props.role === 'vendor' || props.role === 'driver') return 'action-button-success';
  if (props.role === 'customer') return 'action-button-primary';
  return 'action-button-secondary';
});

const handleAction = () => {
  emit('action', { orderId: props.order.id, action: actionButtonText.value });
};

const goToOrderDetail = () => {
  if (props.role === 'customer') {
    router.push(`/customer/order/${props.order.id}`);
  } else if (props.role === 'vendor') {
    router.push(`/vendor/order/${props.order.id}`);
  } else if (props.role === 'driver') {
    router.push(`/driver/order/${props.order.id}`);
  }
};
</script>

<style scoped>
.order-card {
  background-color: var(--color-text-light);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.order-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.order-header { /* Used flex-between utility class */
  margin-bottom: 0.8rem;
}

.order-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-text-dark);
  margin: 0;
}

.order-status {
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--color-text-light);
}

/* Status specific colors */
.status-placed, .status-accepted, .status-preparing, .status-picked-up { background-color: var(--color-primary-orange); }
.status-out-for-delivery { background-color: var(--color-tertiary-blue); }
.status-delivered { background-color: var(--color-secondary-green); }
.status-cancelled { background-color: var(--color-accent-red); }

.order-meta {
  font-size: 0.95rem;
  color: var(--color-grey-text);
  margin-bottom: 1rem;
}

.order-items-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid var(--color-border-light);
  padding-top: 1rem;
}

.order-item {
  font-size: 0.9rem;
  color: var(--color-grey-dark);
  margin-bottom: 0.3rem;
}

.order-item-count {
  font-size: 0.85rem;
  color: var(--color-grey-text);
  font-style: italic;
}

.order-footer { /* Used flex-between utility class */
  margin-top: 1.5rem;
  border-top: 1px solid var(--color-border-light);
  padding-top: 1rem;
}

.order-total {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-text-dark);
}

.action-button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  color: var(--color-text-light);
  transition: background-color 0.2s ease;
}

.action-button-primary {
  background-color: var(--color-primary-orange);
}
.action-button-primary:hover {
  background-color: #e06a30; /* Darker orange */
}

.action-button-success {
  background-color: var(--color-secondary-green);
}
.action-button-success:hover {
  background-color: #4a803c; /* Darker green */
}

.action-button-secondary { /* Placeholder if needed */
  background-color: var(--color-grey-light);
  color: var(--color-text-dark);
}
.action-button-secondary:hover {
  background-color: var(--color-grey-dark);
  color: var(--color-text-light);
}
</style>