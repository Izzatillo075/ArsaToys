import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  const dbPath = resolve('./database.json')
  const dbContent = JSON.parse(readFileSync(dbPath, 'utf-8'))
  
  const order = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
    status: 'pending'
  }
  
  dbContent.orders.push(order)
  writeFileSync(dbPath, JSON.stringify(dbContent, null, 2))
  
  // Send to webhook if URL is configured
  if (config.public.postDataWebhookUrl) {
    await $fetch(config.public.postDataWebhookUrl, {
      method: 'POST',
      body: order
    })
  }
  
  return order
})