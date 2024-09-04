import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

declare module 'fastify' {
  interface FastifyInstance {
    dataSource: PrismaClient
  }
}

async function connectToDatabase() {
  const dataSource = new PrismaClient()
  await dataSource.$connect()

  return dataSource
}

async function dataSourcePlugin(server: FastifyInstance) {
  const dataSource = await connectToDatabase()

  // Decorate server instance with db
  server.decorate('dataSource', dataSource)

  // Closing connection with database when server is closing
  server.addHook('onClose', async function dataSourceOnCloseHook() {
    await server.dataSource.$disconnect()
  })
}

export default fp(dataSourcePlugin, { name: 'data-source' })
