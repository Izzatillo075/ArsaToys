import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async () => {
  const dbPath = resolve('./database.json')
  const dbContent = readFileSync(dbPath, 'utf-8')
  const { categories } = JSON.parse(dbContent)
  return categories
})