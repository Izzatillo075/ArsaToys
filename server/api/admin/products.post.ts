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
  
  const db = getActiveDB()
  const dbContent = await db.read()
  
  const newProduct = {
    id: Date.now().toString(),
    ...product
  }
  
  dbContent.products.push(newProduct)

  await db.update(dbContent)
  
  return newProduct
})
