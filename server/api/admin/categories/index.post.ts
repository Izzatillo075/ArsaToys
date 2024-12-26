import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  const dbPath = resolve('./database.json')
  const dbContent = JSON.parse(readFileSync(dbPath, 'utf-8'))
  
  const category = {
    id: Date.now().toString(),
    name:body.name,
    slug:body.name?.toLowerCase()
  }
  
  dbContent.categories.push(category)
  writeFileSync(dbPath, JSON.stringify(dbContent, null, 2))
  
  // Send to webhook if URL is configured
  if (config.public.postDataWebhookUrl) {
    await $fetch(config.public.postDataWebhookUrl, {
      method: 'POST',
      body: category
    })
  }
  
  return category
})