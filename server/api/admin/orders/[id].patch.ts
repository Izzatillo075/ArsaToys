export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { status } = await readBody(event)

  const db = getActiveDB()
  const dbContent = await db.read()

  const order = dbContent.orders.find((o: any) => o.id === id)
  if (!order) {
    throw createError({
      statusCode: 404,
      message: 'Order not found'
    })
  }

  order.status = status
  await db.update(dbContent)

  return order
})
