<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Products</h2>
      <div class="flex flex-wrap gap-2">
        <button 
          @click="clearFilters"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="[
            selectedCategories.length === 0 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
          ]"
        >
          All
        </button>
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="toggleCategory(category.slug)"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="[
            isSelected(category.slug)
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
          ]"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in filteredProducts" 
           :key="product.id" 
           class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg mb-4">
        <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ product.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-xl font-bold">${{ product.price }}</span>
          <AddToCartButton :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, Category } from '~/types'

const { data: products } = await useFetch<Product[]>('/api/products')
const { data: categories } = await useFetch<Category[]>('/api/categories')
const selectedCategories = ref<string[]>([])

const isSelected = (categorySlug: string) => {
  return selectedCategories.value.includes(categorySlug)
}

const toggleCategory = (categorySlug: string) => {
  const index = selectedCategories.value.indexOf(categorySlug)
  if (index === -1) {
    selectedCategories.value.push(categorySlug)
  } else {
    selectedCategories.value.splice(index, 1)
  }
}

const clearFilters = () => {
  selectedCategories.value = []
}

const filteredProducts = computed(() => {
  if (selectedCategories.value.length === 0) return products.value
  return products.value?.filter(p => selectedCategories.value.includes(p.category))
})
</script>