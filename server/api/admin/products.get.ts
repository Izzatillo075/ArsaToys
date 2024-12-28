export default defineEventHandler(async () => {
  const db = getActiveDB()
  const dbContent = await db.read()
  return dbContent.products
})
