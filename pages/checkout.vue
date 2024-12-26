<template>
  <div>
    <h2 class="text-2xl font-bold mb-8">Checkout</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-6">
        <h3 class="text-xl font-semibold">Contact Information</h3>
        <form @submit.prevent="submitOrder" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input v-model="formData.customerName" required
                   class="w-full rounded-lg border-gray-300 dark:bg-gray-700" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Phone Number</label>
            <input v-model="formData.phoneNumber" required
                   class="w-full rounded-lg border-purple-300 dark:bg-purple-700" />
          </div>
          
          <button type="submit" 
                  class="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg">
            Place Order
          </button>
        </form>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4">Order Summary</h3>
        <div class="space-y-4">
          <div v-for="item in cartStore.items" :key="item.product.id" 
               class="flex justify-between">
            <span>{{ item.product.name }} (x{{ item.quantity }})</span>
            <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
          </div>
          
          <div class="border-t pt-4 mt-4">
            <div class="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>${{ cartStore.totalAmount.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const cartStore = useCartStore()
const formData = ref({
  customerName: '',
  phoneNumber: ''
})

const submitOrder = async () => {
  try {
    await $fetch('/api/orders', {
      method: 'POST',
      body: {
        items: cartStore.items,
        customerName: formData.value.customerName,
        phoneNumber: formData.value.phoneNumber,
        totalAmount: cartStore.totalAmount
      }
    })
    
    cartStore.clearCart()
    router.push('/')
  } catch (error) {
    console.error('Failed to submit order:', error)
  }
}
</script>