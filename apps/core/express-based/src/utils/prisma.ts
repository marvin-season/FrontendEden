import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
  log:  ["error", "info", "warn"]
})

export default prisma