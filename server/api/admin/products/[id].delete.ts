import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  const dbPath = resolve('./database.json')
  const dbContent = JSON.parse(readFileSync(dbPath, 'utf-8'))
  
  const index = dbContent.products.findIndex(p => p.id === id)
  if (index === -1) {
    throw createError({
      statusCode: 404,
      message: 'Product not found'
    })
  }
  
  dbContent.products.splice(index, 1)
  writeFileSync(dbPath, JSON.stringify(dbContent, null, 2))
  
  return { success: true }
})
