import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { z } from 'zod'

const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  description: z.string(),
  image: z.string().url()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const product = productSchema.parse(body)
  
  const dbPath = resolve('./database.json')
  const dbContent = JSON.parse(readFileSync(dbPath, 'utf-8'))
  
  const newProduct = {
    id: Date.now().toString(),
    ...product
  }
  
  dbContent.products.push(newProduct)
  writeFileSync(dbPath, JSON.stringify(dbContent, null, 2))
  
  return newProduct
})
