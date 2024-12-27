export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const db = getActiveDB()
  const dbContent = await db.read()

  if (!body.name) {
    return;
  }

  const category = {
    id: Date.now().toString(),
    name: body.name,
    slug: body.name?.toLowerCase()
  }

  dbContent.categories.push(category)
  await db.update(dbContent)

  // Send to webhook if URL is configured
  if (config.public.postDataWebhookUrl) {
    await $fetch(config.public.postDataWebhookUrl, {
      method: 'POST',
      body: category
    })
  }

  return category
})
