export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const db = getActiveDB()

  const dbContent = await db.read();
  const order = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
    status: 'pending'
  }

  dbContent.orders.push(order)

  await db.update(dbContent)

  // Send to webhook if URL is configured
  if (config.public.postDataWebhookUrl) {
    await $fetch(config.public.postDataWebhookUrl, {
      method: 'POST',
      body: order
    })
  }

  return order
})
