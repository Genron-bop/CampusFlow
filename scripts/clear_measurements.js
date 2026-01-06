import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  try {
    const total = await prisma.measurement.count()
    if (!total) {
      console.log('No measurements found; nothing to delete.')
      return
    }
    const res = await prisma.measurement.deleteMany()
    console.log(`Deleted ${res.count} measurements (was ${total}).`)
  } catch (e) {
    console.error('Failed to clear measurements:', e.message)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()
