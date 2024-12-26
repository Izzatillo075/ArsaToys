import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  const dbPath = resolve('./database.json')
  const dbContent = JSON.parse(readFileSync(dbPath, 'utf-8'))
  
  const index = dbContent.categories.findIndex(c => c.id === id)
  if (index === -1) {
    throw createError({
      statusCode: 404,
      message: 'Category not found'
    })
  }
  
  dbContent.categories.splice(index, 1)
  writeFileSync(dbPath, JSON.stringify(dbContent, null, 2))
  
  return { success: true }
})
