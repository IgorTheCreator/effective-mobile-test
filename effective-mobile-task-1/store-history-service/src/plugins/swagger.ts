import fp from 'fastify-plugin'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'

async function swaggerPlugin(server: FastifyInstance) {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Store history service',
        description: 'Service that keeps history about balances and products',
        version: '0.1.0'
      },
      tags: [
        { name: 'balances history', description: 'Balances history related end-points' },
        { name: 'products history', description: 'Products history related end-points' }
      ]
    }
  })

  server.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })
}

export default fp(swaggerPlugin, { name: 'swagger-plugin' })
