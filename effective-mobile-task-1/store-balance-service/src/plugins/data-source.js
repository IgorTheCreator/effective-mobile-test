import { PrismaClient } from '@prisma/client'
import fp from 'fastify-plugin'

async function connectToDatabase() {
  const dataSource = new PrismaClient()
  await dataSource.$connect()

  return dataSource
}

async function dataSourcePlugin(server) {
  const dataSource = await connectToDatabase()

  // Decorate server instance with db
  server.decorate('dataSource', dataSource)

  // Closing connection with database when server is closing
  server.addHook('onClose', async function dataSourceOnCloseHook() {
    await server.dataSource.$disconnect()
  })
}

export default fp(dataSourcePlugin, { name: 'data-source' })
