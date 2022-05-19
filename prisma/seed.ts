import { PrismaClient, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

const users: Prisma.SPXUserCreateInput[] = [
  {
    username: 'guest@gluo.mx',
    password: 'password'
  },
  {
    username: 'host@gluo.mx',
    password: 'password'
  },  
]

const guests: Prisma.SPXGuestCreateInput[] = [
  {
    username: 'guest@gluo.mx',
    name: 'Guest',
    lastname: 'Demo',
    status: 'active'
  }
]

const hosts: Prisma.SPXHostCreateInput[] = [
  {
    username: 'host@gluo.mx',
    name: 'Host',
    lastname: 'Demo',
    status: 'active'
  }
]

async function main() {
  console.log(`Start seeding ...`)
  // Users
  for (const u of users) {
    const user = await prisma.sPXUser.create({
      data: u,
    })
    console.log(`Created user with id: ${user.username}`)
  }  
  // Guests
  for (const u of guests) {
    const user = await prisma.sPXGuest.create({
      data: u,
    })
    console.log(`Created guest with id: ${user.username}`)
  }
  // Hosts
  for (const u of hosts) {
    const user = await prisma.sPXHost.create({
      data: u,
    })
    console.log(`Created host with id: ${user.username}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })