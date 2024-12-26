<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex items-center text-primary-600">
              <h1 class="text-xl font-bold">ArsaToys</h1>
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/cart" class="relative p-2">
              <span class="absolute -top-1 -right-1 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {{ cartStore.totalItems }}
              </span>
              <Icon name="ph:shopping-cart" size="24" />
            </NuxtLink>
            <NuxtLink to="/profile" class="p-2">
              <Icon name="ph:user-circle" size="24" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
</script>