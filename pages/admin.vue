<template>
  <div class="space-y-8">
    <h2 class="text-2xl font-bold">Admin Dashboard</h2>
    
    <!-- Products Management -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h3 class="text-xl font-semibold mb-4">Products</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full mb-4">
          <thead>
            <tr>
              <th class="text-left py-2">Name</th>
              <th class="text-left py-2">Price</th>
              <th class="text-left py-2">Category</th>
              <th class="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="py-2">{{ product.name }}</td>
              <td>${{ product.price }}</td>
              <td>{{ product.category }}</td>
              <td class="space-x-2">
                <button @click="editProduct(product)"
                        class="text-blue-500 hover:text-blue-600">
                  Edit
                </button>
                <button @click="deleteProduct(product.id)"
                        class="text-red-500 hover:text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <button @click="showProductModal = true" 
                class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">
          Add Product
        </button>
      </div>
    </div>
    
    <!-- Categories Management -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h3 class="text-xl font-semibold mb-4">Categories</h3>
      <div class="space-y-4">
        <div v-for="category in categories" :key="category.id" 
             class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <span>{{ category.name }}</span>
            <button @click="editCategory(category)"
                    class="text-blue-500 hover:text-blue-600">
              Edit
            </button>
          </div>
          <button @click="deleteCategory(category.id)"
                  class="text-red-500 hover:text-red-600">
            Delete
          </button>
        </div>
        
        <form @submit.prevent="saveCategory" class="mt-4 space-y-4">
          <input v-model="categoryForm.name" placeholder="Category Name"
                 class="w-full rounded-lg border-gray-300 dark:bg-gray-700" />
          <button type="submit" 
                  class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">
            {{ categoryForm.id ? 'Update' : 'Add' }} Category
          </button>
        </form>
      </div>
    </div>
    
    <!-- Orders -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h3 class="text-xl font-semibold mb-4">Recent Orders</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="text-left py-2">Order ID</th>
              <th class="text-left py-2">Customer</th>
              <th class="text-left py-2">Total</th>
              <th class="text-left py-2">Status</th>
              <th class="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td class="py-2">{{ order.id }}</td>
              <td>{{ order.customerName }}</td>
              <td>${{ order.totalAmount.toFixed(2) }}</td>
              <td>{{ order.status }}</td>
              <td class="space-x-2">
                <button @click="updateOrderStatus(order.id, 'completed')"
                        class="text-green-500 hover:text-green-600">
                  Complete
                </button>
                <button @click="updateOrderStatus(order.id, 'cancelled')"
                        class="text-red-500 hover:text-red-600">
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Product Modal -->
    <div v-if="showProductModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg">
        <h3 class="text-xl font-semibold mb-4">
          {{ productForm.id ? 'Edit' : 'Add' }} Product
        </h3>
        
        <form @submit.prevent="saveProduct" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input v-model="productForm.name" required
                   class="w-full rounded-lg border-gray-300 dark:bg-gray-700" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Price</label>
            <input v-model.number="productForm.price" type="number" step="0.01" required
                   class="w-full rounded-lg border-gray-300 dark:bg-gray-700" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Category</label>
            <select v-model="productForm.category" required
                    class="w-full rounded-lg border-gray-300 dark:bg-gray-700">
              <option v-for="category in categories" :key="category.id" :value="category.slug">
                {{ category.name }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea v-model="productForm.description" required
                      class="w-full rounded-lg border-gray-300 dark:bg-gray-700"></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Image URL</label>
            <input v-model="productForm.image" type="url" required
                   class="w-full rounded-lg border-gray-300 dark:bg-gray-700" />
          </div>
          
          <div class="flex justify-end space-x-2">
            <button type="button" @click="showProductModal = false"
                    class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
              Cancel
            </button>
            <button type="submit"
                    class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg">
              {{ productForm.id ? 'Update' : 'Add' }} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Order, Product } from '~/types'

const { data: orders, refresh: refreshOrders } = await useFetch<Order[]>('/api/admin/orders')
const { data: categories, refresh: refreshCategories } = await useFetch<Category[]>('/api/categories')
const { data: products, refresh: refreshProducts } = await useFetch<Product[]>('/api/admin/products')

const showProductModal = ref(false)
const productForm = ref<Partial<Product>>({
  name: '',
  price: 0,
  category: '',
  description: '',
  image: ''
})

const categoryForm = ref<Partial<Category>>({
  name: ''
})

const resetProductForm = () => {
  productForm.value = {
    name: '',
    price: 0,
    category: '',
    description: '',
    image: ''
  }
}

const editProduct = (product: Product) => {
  productForm.value = { ...product }
  showProductModal.value = true
}

const saveProduct = async () => {
  try {
    if (productForm.value.id) {
      await $fetch(`/api/admin/products/${productForm.value.id}`, {
        method: 'PATCH',
        body: productForm.value
      })
    } else {
      await $fetch('/api/admin/products', {
        method: 'POST',
        body: productForm.value
      })
    }
    showProductModal.value = false
    resetProductForm()
    refreshProducts()
  } catch (error) {
    console.error('Failed to save product:', error)
  }
}

const deleteProduct = async (productId: string) => {
  if (!confirm('Are you sure you want to delete this product?')) return
  
  try {
    await $fetch(`/api/admin/products/${productId}`, {
      method: 'DELETE'
    })
    refreshProducts()
  } catch (error) {
    console.error('Failed to delete product:', error)
  }
}

const editCategory = (category: Category) => {
  categoryForm.value = { ...category }
}

const saveCategory = async () => {
  try {
    if (categoryForm.value.id) {
      await $fetch(`/api/admin/categories/${categoryForm.value.id}`, {
        method: 'PATCH',
        body: categoryForm.value
      })
    } else {
      await $fetch('/api/admin/categories', {
        method: 'POST',
        body: categoryForm.value
      })
    }
    categoryForm.value = { name: '' }
    refreshCategories()
  } catch (error) {
    console.error('Failed to save category:', error)
  }
}

const deleteCategory = async (categoryId: string) => {
  if (!confirm('Are you sure you want to delete this category?')) return
  
  try {
    await $fetch(`/api/admin/categories/${categoryId}`, {
      method: 'DELETE'
    })
    refreshCategories()
  } catch (error) {
    console.error('Failed to delete category:', error)
  }
}

const updateOrderStatus = async (orderId: string, status: 'completed' | 'cancelled') => {
  try {
    await $fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      body: { status }
    })
    refreshOrders()
  } catch (error) {
    console.error('Failed to update order status:', error)
  }
}
</script>
