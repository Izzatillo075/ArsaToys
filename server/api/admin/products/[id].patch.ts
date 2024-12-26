import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { z } from 'zod'

const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  image: z.string().url().optional()
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const updates = await readBody(event)
  const validUpdates = productUpdateSchema.parse(updates)
  
  const dbPath = resolve('./database.json')
  const dbContent = JSON.parse(readFileSync(dbPath, 'utf-8'))
  
  const product = dbContent.products.find(p => p.id === id)
  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found'
    })
  }
  
  Object.assign(product, validUpdates)
  writeFileSync(dbPath, JSON.stringify(dbContent, null, 2))
  
  return product
})
