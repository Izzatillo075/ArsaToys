export default defineEventHandler(async () => {
  const db = getActiveDB()
  const { products } = await db.read();
  return products
})
