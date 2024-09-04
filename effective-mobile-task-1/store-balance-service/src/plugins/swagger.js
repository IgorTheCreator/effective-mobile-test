import fp from 'fastify-plugin'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

async function swaggerPlugin(server) {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Store balance service',
        description: 'Service that keeps information about balances and products',
        version: '0.1.0'
      },
      tags: [
        { name: 'balances', description: 'Balances related end-points' },
        { name: 'products', description: 'Products related end-points' },
        { name: 'shops', description: 'Supporting routes for shops' }
      ]
    }
  })

  server.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })
}

export default fp(swaggerPlugin, { name: 'swagger-plugin' })
