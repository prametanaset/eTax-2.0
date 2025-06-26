// ✅ Correct usage in server file, e.g., ~/server/api/token.get.ts
import { getToken } from '#auth'

export default eventHandler(async (event) => {
  const token = await getToken({ event })  // ต้องส่ง event แบบนี้
  return token || 'no token present'
})
