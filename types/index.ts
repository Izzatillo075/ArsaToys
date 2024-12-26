export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  customerName: string
  phoneNumber: string
  totalAmount: number
  createdAt: string
  status: 'pending' | 'completed' | 'cancelled'
}