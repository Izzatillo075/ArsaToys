<template>
  <div>
    <h2 class="text-2xl font-bold mb-8">Shopping Cart</h2>
    
    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <p class="text-gray-500">Your cart is empty</p>
      <NuxtLink to="/" class="text-primary-500 hover:text-primary-600 mt-4 inline-block">
        Continue Shopping
      </NuxtLink>
    </div>
    
    <div v-else>
      <TransitionGroup 
        name="list" 
        tag="div" 
        class="space-y-4">
        <div v-for="item in cartStore.items" 
             :key="item.product.id" 
             class="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg">
          <div class="flex items-center space-x-4">
            <img :src="item.product.image" :alt="item.product.name" class="w-16 h-16 object-cover rounded">
            <div>
              <h3 class="font-semibold">{{ item.product.name }}</h3>
              <p class="text-gray-500">${{ item.product.price }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <button @click="updateQuantity(item.product.id, item.quantity - 1)"
                      class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Icon name="ph:minus" />
              </button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.product.id, item.quantity + 1)"
                      class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Icon name="ph:plus" />
              </button>
            </div>
            <button @click="removeItem(item.product.id)" 
                    class="text-red-500 hover:text-red-600 transition-colors">
              <Icon name="ph:trash" />
            </button>
          </div>
        </div>
      </TransitionGroup>
      
      <div class="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div class="flex justify-between text-xl font-bold mb-4">
          <span>Total:</span>
          <span>${{ cartStore.totalAmount.toFixed(2) }}</span>
        </div>
        
        <NuxtLink to="/checkout" 
                  class="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg text-center block transition-colors">
          Proceed to Checkout
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()

const updateQuantity = (productId: string, quantity: number) => {
  if (quantity < 1) {
    removeItem(productId)
    return
  }
  cartStore.updateQuantity(productId, quantity)
}

const removeItem = (productId: string) => {
  cartStore.removeItem(productId)
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>