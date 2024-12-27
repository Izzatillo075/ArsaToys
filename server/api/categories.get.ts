export default defineEventHandler(async () => {
  const db = getActiveDB()
  const { categories } = await db.read();
  return categories
})
