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

  const db = getActiveDB()
  const dbContent = await db.read()

  const product = dbContent.products.find((p: any) => p.id === id)
  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found'
    })
  }

  Object.assign(product, validUpdates)
  await db.update(dbContent)

  return product
})
