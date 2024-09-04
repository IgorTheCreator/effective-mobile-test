import fp from 'fastify-plugin'
import { createBodySchema } from './create-body.js'
import { createResponseSchema } from './create-response.js'

async function shopsLoader(server) {
  server.addSchema(createBodySchema)
  server.addSchema(createResponseSchema)
}

export default fp(shopsLoader)
