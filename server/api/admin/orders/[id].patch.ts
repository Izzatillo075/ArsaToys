import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { status } = await readBody(event)
  
  const dbPath = resolve('./database.json')
  const dbContent = JSON.parse(readFileSync(dbPath, 'utf-8'))
  
  const order = dbContent.orders.find(o => o.id === id)
  if (!order) {
    throw createError({
      statusCode: 404,
      message: 'Order not found'
    })
  }
  
  order.status = status
  writeFileSync(dbPath, JSON.stringify(dbContent, null, 2))
  
  return order
})
