export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const db = getActiveDB()
  const dbContent = await db.read()

  const index = dbContent.products.findIndex((p: any) => p.id === id)
  if (index === -1) {
    throw createError({
      statusCode: 404,
      message: 'Product not found'
    })
  }

  dbContent.products.splice(index, 1)

  await db.update(dbContent)

  return { success: true }
})
