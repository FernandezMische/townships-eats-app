<!-- Frontend/src/components/Customer/VendorCard.vue -->
<template>
  <div class="vendor-card" @click="viewVendor(vendor.id)">
    <img :src="vendor.image" :alt="vendor.name" class="vendor-image">
    <div class="vendor-details">
      <h3>{{ vendor.name }}</h3>
      <p class="vendor-cuisine">{{ vendor.cuisine }}</p>
      <div class="vendor-rating">
        <span class="rating-value">{{ vendor.rating.toFixed(1) }}</span> <i class="star-icon">★</i>
        <span class="reviews-count">({{ vendor.reviews }} reviews)</span>
      </div>
      <PrimaryButton text="View Menu" type="primary" class="mt-15" @click.stop="viewVendor(vendor.id)" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from '../Shared/PrimaryButton.vue';

const props = defineProps({
  vendor: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const emit = defineEmits(['view-vendor']);

const viewVendor = (vendorId) => {
  emit('view-vendor', vendorId);
  router.push(`/customer/vendor/${vendorId}`);
};
</script>

<style scoped>
.vendor-card {
  background-color: var(--color-background-light);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.vendor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.vendor-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 4px solid var(--color-primary-orange);
}

.vendor-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.vendor-details h3 {
  margin: 0 0 5px;
  color: var(--color-text-dark);
  font-size: 1.3em;
}

.vendor-cuisine {
  margin: 0 0 10px;
  color: var(--color-grey-text);
  font-style: italic;
  font-size: 0.95em;
}

.vendor-rating {
  color: var(--color-primary-orange);
  font-size: 1em;
  margin-bottom: 15px;
}

.rating-value {
  font-weight: bold;
}

.star-icon {
  margin-left: 3px;
  margin-right: 5px;
}

.reviews-count {
  font-size: 0.9em;
  color: var(--color-grey-text);
}

.mt-15 {
  margin-top: 15px;
}
</style>