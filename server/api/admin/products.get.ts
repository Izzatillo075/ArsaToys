import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async () => {
  const dbPath = resolve('./database.json')
  const dbContent = JSON.parse(readFileSync(dbPath, 'utf-8'))
  return dbContent.products
})
