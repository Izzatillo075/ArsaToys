export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const db = getActiveDB()
  const dbContent = await db.read()

  const index = dbContent.categories.findIndex((c: any) => c.id === id)
  if (index === -1) {
    throw createError({
      statusCode: 404,
      message: 'Category not found'
    })
  }

  dbContent.categories.splice(index, 1)
  await db.update(dbContent)

  return { success: true }
})
