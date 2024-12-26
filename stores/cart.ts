import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: (state) => state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  },
  actions: {
    addItem(product: Product) {
      const existingItem = this.items.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }
    },
    removeItem(productId: string) {
      const index = this.items.findIndex(item => item.product.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },
    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find(item => item.product.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    clearCart() {
      this.items = []
    }
  }
})