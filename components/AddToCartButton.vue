<template>
  <div class="relative">
    <button v-if="!isInCart" 
            @click="addToCart"
            class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-all duration-300">
      Add to Cart
    </button>
    
    <div v-else class="flex items-center space-x-2">
      <button @click="updateQuantity(quantity - 1)"
              class="bg-primary-500 hover:bg-primary-600 text-white w-8 h-8 rounded-lg flex items-center justify-center">
        <Icon name="ph:minus" />
      </button>
      <span class="font-medium">{{ quantity }}</span>
      <button @click="updateQuantity(quantity + 1)"
              class="bg-primary-500 hover:bg-primary-600 text-white w-8 h-8 rounded-lg flex items-center justify-center">
        <Icon name="ph:plus" />
      </button>
    </div>
    
    <!-- Animation overlay -->
    <Transition name="fade">
      <div v-if="showAnimation" 
           class="absolute inset-0 bg-primary-500 rounded-lg flex items-center justify-center">
        <Icon name="ph:check-bold" class="text-white text-xl" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const showAnimation = ref(false)
const quantity = computed(() => {
  const item = cartStore.items.find(item => item.product.id === props.product.id)
  return item?.quantity || 0
})
const isInCart = computed(() => quantity.value > 0)

const addToCart = () => {
  cartStore.addItem(props.product)
  showAnimation.value = true
  setTimeout(() => {
    showAnimation.value = false
  }, 1000)
}

const updateQuantity = (newQuantity: number) => {
  if (newQuantity < 1) {
    cartStore.removeItem(props.product.id)
  } else {
    cartStore.updateQuantity(props.product.id, newQuantity)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>