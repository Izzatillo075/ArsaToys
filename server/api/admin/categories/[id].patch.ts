import { z } from 'zod'

const categoryUpdateSchema = z.object({
  name: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const updates = await readBody(event)
  const validUpdates = categoryUpdateSchema.parse(updates)

  const db = getActiveDB()
  const dbContent = await db.read()

  const category = dbContent.categories.find((c: any) => c.id === id)
  if (!category) {
    throw createError({
      statusCode: 404,
      message: 'Category not found'
    })
  }

  Object.assign(category, validUpdates)
  await db.update(dbContent)

  return category
})
